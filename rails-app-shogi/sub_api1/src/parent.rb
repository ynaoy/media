# encoding: UTF-8
require 'json'
require 'socket'

CONSIDER_TIME = 1

# 子プロセスに入力を送る用
parent_r, parent_w = IO.pipe
# 子プロセスから出力を貰う用
child_r, child_w = IO.pipe

# --メソッド群--
def init_child(r)
  # ---子プロセスの起動を確認する---
  reg = /readyok/
  loop do
    out = r.gets
    # readyokが出ていたら初期動作完了でoutput_childメソッドが使える
    if reg.match(out)
      p "child start"
      break
    end
  end
end

def output_child(r,items)
  # ---並列処理で子プロセスから出力を受け取る---
  ret = {}
  th = Thread.new do
    n = 0
    reg = /bestmove/
    before_out = ""
    loop do
      out = r.gets
      # bestmoveが出ていたら最善手を受け取る
      if reg.match(out)
        n += 1
        ret[n] = extract_data(before_out,n)
      end
      break if n == items.length + 1 # 投了の局面まで含めるため+１
      before_out = out
    end
  end
  return ret
end

def step(kifu,w)
  # ---1手検討する---
  w.puts "position startpos moves #{kifu}"
  w.puts "go ponder"

  sleep(CONSIDER_TIME) #考慮時間分スリープ
  w.puts "stop"
  #w.puts "quit"
  sleep(1)
end

def convert_pv_to_pos(pv)
  # ---usi形式の文字列を棋譜形式のポジションに変換する---
  #    ※駒の種類の情報は失われている
  #    例: 1a2b → 1122, 2b5f → 2256
  reg = /a|b|c|d|e|f|g|h|i/
  hash = Hash["a",1, "b",2, "c",3, "d",4, "e",5, "f",6, "g",7, "h",8, "i",9 ]

  return (pv == "resign")? pv : pv.gsub(reg,hash)
end

def extract_data(str,n)
  # ---評価値と候補手を抜き出す---

  pv = /pv.*[a-z]/.match(str)[0].slice(3..-1)
  pv = convert_pv_to_pos(pv)

  cp =  /cp .[0-9]*/.match(str)
  cp = if(cp.nil?)
    (n%2==0)? "31111": "-31111"
  else
    cp[0].slice(3..-1)
  end
  cp = (cp.to_i * -1).to_s if(n%2==0)
  return { pv:pv, cp:cp }
end

def extract_kifu(str)
  # ---棋譜から指し手の情報を取り出す---
  reg = /[[１-９]|同][[^[)|打]]]*[)|打]/  #1～9か同から始まって、[)と打]を含まない文字が続き、[)と打]
  str.scan(reg)
end

def convert_xy(kifu)
  #---棋譜の３四や２五等をusi形式に変換する---
  kanji_to_integer = {"一"=> "a", "二"=> "b", "三"=> "c", "四"=> "d", "五"=> "e",
                      "六"=> "f", "七"=> "g", "八"=> "h", "九"=> "i"}
  x = kifu[0].tr('０-９','0-9').to_s
  y = kanji_to_integer[kifu[1]]
  return x+y
end

def convert_xy2(kifu)
  #---棋譜の34や25等をusi形式に変換する---
  int_to_eng = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
  x = kifu[-3]
  y =int_to_eng[kifu[-2].to_i-1]
  return x+y
end

def convert_koma_to_eng(kifu,len)
  #---棋譜の最後が打の時に駒をusi形式に変換する---
  koma_to_eng = { "王"=> "K", "飛"=> "R", "角"=> "B", "金"=> "G", "銀"=> "S",
                  "桂"=> "N", "香"=> "L", "歩"=> "P"}
  res = koma_to_eng[kifu[2]]
  return res
end

def convert_kifu_to_usi(kifus)
  #---棋譜全体をusi形式に変換する---
  usi =[]
  old_pos = ""

  for n in 0..(kifus.length-1) do
    kifu = kifus[n]
    if(kifu[0]=="同")
      pos = convert_xy2(kifu) + old_pos
      usi.push(pos)

    else
      next_pos = convert_xy(kifu)
      if(kifu[-1]=="打")
        pos = convert_koma_to_eng(kifu,n)+ "*" +next_pos
        usi.push(pos)
      else
        pos = convert_xy2(kifu) + next_pos

        if(kifu[3]=="成")
          pos+="+"
        end
        usi.push(pos)
      end

      old_pos = next_pos
    end
  end
  return usi
end

# ---子プロセスの開始---
spawn("./" + ENV['CHILD_PROCESS_NAME'], :in => parent_r, :out => child_w)

# ---子プロセスに入力を渡す & 初期化処理---
parent_w.puts "usi"
parent_w.puts "isready"
parent_w.puts "usinewgame"
init_child(child_r)

# ---サーバーを立ててソケット通信する---
serv = TCPServer.new(20000)
# serv.set_encoding 'utf-8'
loop do
  # ソケット OPEN （クライアントからの接続待ち）
  sock = serv.accept
  # sock.set_encoding 'utf-8'
  raw_kifus = sock.recvmsg[0]
  raw_kifus.force_encoding("UTF-8") # 元のエンコードがASCII-8BITになる。日本語を扱うため変更する

  # 棋譜情報の抽出とUSIプロトコル形式に変換
  kifus = extract_kifu(raw_kifus)
  usi_kifus = convert_kifu_to_usi(kifus)

  # 子プロセスからの出力を受け取る
  ret = output_child(child_r,kifus)

  # --検討スタート--

  usi_input = ""
  # 最初の状態
  step(usi_input,parent_w)
  # 1ステップ目以降の状態
  for n in 0..(usi_kifus.length-1) do
    usi_input += usi_kifus[n]
    step(usi_input,parent_w)
    usi_input += " "
  end
  p ret.to_json
  sock.sendmsg ret.to_json

  # ソケット CLOSE
  sock.close
end
# 子プロセスの終了
parent_w.puts "quit"

