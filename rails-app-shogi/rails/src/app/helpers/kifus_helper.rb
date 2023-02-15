module KifusHelper
  # １から９までの漢字と数字の変換。１一や２四などの表記に使う
  $kanji_to_integer = {"一"=> 1, "二"=> 2, "三"=> 3, "四"=> 4, "五"=> 5, "六"=> 6, "七"=> 7, "八"=> 8, "九"=> 9}

  def my_kifu?(kifu)
    # loginしているuserのidとKifuモデルのuser_idが一致するかどうかを調べる
    current_user.nil? ? false : current_user.id == kifu.user_id
  end

  def my_kifu_jwt?(token,kifu)
    # jwt認証形式の時のloginしているuserのidとKifuモデルのuser_idが一致するかどうかを調べる
    session_user(token).nil? ? false : session_user(token).id == kifu.user_id
  end

  def kifu_to_board(kifu_list)

    # 指し手の集まりをviewに渡す形式に変換する

    old_pos = [0,0] # 移動前のポジション
    turn = 1 # 先手なら1、後手なら2

    return_text_lists = 
    [
      [
        ["香","桂","銀","金","王","金","銀","桂","香"],
        ["","飛","","","","","","角",""],
        ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
        ["","角","","","","","","飛",""],
        ["香","桂","銀","金","王","金","銀","桂","香"]
      ]
    ]

    return_flg_lists =  
    [
      [
        [2,2,2,2,2,2,2,2,2],
        [0,2,0,0,0,0,0,2,0],
        [2,2,2,2,2,2,2,2,2],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1],
        [0,1,0,0,0,0,0,1,0],
        [1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ]
    ]

    # viewに渡す形に変換してreturn_〇〇_listにpush
    for n in 0..(kifu_list.length-1) do
      turn = (n%2==0)? 1: 2
      text_list = return_text_lists[n].deep_dup
      flg_list = return_flg_lists[n].deep_dup

      text_list, flg_list, old_pos =
                        extract_text_and_flg(kifu_list[n], text_list, flg_list, turn, old_pos)
      return_text_lists.push(text_list)
      return_flg_lists.push(flg_list)
    end

    return return_text_lists,return_flg_lists
  end

  def extract_text_and_flg(kifu_str, text_list, flg_list, turn, old_pos)

    # 〇〇駒成(××)、〇〇成駒(××)、同　駒(××)、〇〇駒打、〇〇駒(××)の５つをパターン分けして正規化する
    # ××にある駒が〇〇に移動する

    if(kifu_str[3] == "成") # 例: ３二銀成(33) → ３二全(33)、２二桂成(23) →２二圭(23)
      kifu_str[2] = convert_nari(kifu_str[2])
      kifu_str.slice!(3)
    end

    if(kifu_str[2] == "成") # 例: ３二成銀(33) → ３二全(33)、 ２二成桂(23) →２二圭(23)
      kifu_str[3] = convert_nari(kifu_str[3])
      kifu_str.slice!(2)
    end

    # 今いる駒の位置を取得
    x = 8-(kifu_str[4].to_i-1) # kifu_strでは始点が右上なのでlist形式で使えるように左上に変更する
    y = kifu_str[5].to_i-1

    # 次に進む位置を取得
    if(kifu_str[0] == "同") # 同　〇では直前の相手の駒の位置に移動する
      next_x = old_pos[0]
      next_y = old_pos[1]
    else 
      next_x,next_y = convert_xy(kifu_str)
    end

    # text_listとflg_listを次の状態にupdateする
    if(kifu_str[-1] == "打") 
      text_list, flg_list =
        update_text_and_flg(text_list, flg_list, kifu_str, turn, nil, nil, next_x, next_y)
    else
      text_list, flg_list = 
        update_text_and_flg(text_list, flg_list, kifu_str, turn, x, y, next_x, next_y)
    end

    return text_list, flg_list, [next_x,next_y]
  end

  def update_text_and_flg(text_list, flg_list, kifu_str, turn, x, y, next_x, next_y)

    # 移動先のtext_listとflg_listをkifu_strとturnで更新
    # 移動元のtext_listとflg_listを空にする !!移動元の場所に一部例外あり!!

    sub_board_dict = {"飛"=> 0, "角"=> 1, "金"=> 2, "銀"=> 3, "桂"=> 4, "香"=> 5, "歩"=> 6, "玉"=> 7,
                      "龍"=> 0, "馬"=> 1,           "全"=> 3, "圭"=> 4, "杏"=> 5, "と"=> 6,}

    #移動先に相手の駒がある時、
    #先手ならflg_list[9][index]、後手ならflg_list[10][index]に取った駒を追加する
    if(text_list[next_y][next_x] != "")
      flg_list[8+turn][sub_board_dict[text_list[next_y][next_x]]] +=1
    end

    #移動元の駒とflgの位置を空にする
    if(x && y) 
      text_list[y][x] = ""
      flg_list[y][x] = 0
    #例外的に〇〇打の時は元いた位置はxとyではなくflg_listに存在する
    else
      flg_list[8+turn][sub_board_dict[kifu_str[2]]] -=1
    end

    #移動先の駒の位置をtextに、flgをturnに変更
    text_list[next_y][next_x] = kifu_str[2]
    flg_list[next_y][next_x] = turn

    return text_list,flg_list
  end

  def convert_nari(str)

    #kifu_str[3]が成の時にstrを変換する　例:歩→と 飛→龍

    case str

    when "飛"
      return "龍"

    when "角"
      return "馬"

    when "銀"
      return "全"

    when "桂"
      return "圭"

    when "香"
      return "杏"

    when "歩"
      return "と"

    end
  end

  def convert_xy(kifu)

    # kifuの３四や２五等を半角数字に変換する
    
    x = 8-(kifu[0].tr('０-９','0-9').to_i-1)
    y = $kanji_to_integer[kifu[1]]-1
    return x,y
  end

  def fetch_data_from_content(params)

    #params[:content]からplayer1、player2、winを取り出してparamに含める

    reg = /[先|後]手：.{,10}/
    reg_win = /[先|後]手の勝ち/
    player = params[:content].scan(reg)
    if !player.empty?
      params[:player1] = player[0][3..] if( params[:player1]=="" )
      params[:player2] = player[1][3..] if( params[:player2]=="" )
    end
    win = params[:content].scan(reg_win)

    params[:win] = if !win.empty?
      ( win[0] == "先手の勝ち" )? 1 : 2
    else
      0
    end
    return params
  end

  def win_or_lose(win,kifu)
    # 棋譜一覧表示時に勝った方にidを付与する
    "win" if win == kifu.win
  end

  def timewithzone_to_str(date, format="%Y年%-m月%-d日")
    # Timewithzoneクラスのtime_zoneをTokyoに変換して、さらにformat型のstrに変換して返す
    date.in_time_zone('Tokyo').strftime(format)
  end

  def display_day(now_time)

    #history.html.erbでnow_timeごとに返す値を変更。

    if(now_time== timewithzone_to_str(Time.zone.now))
      return "今日"
    elsif(now_time== timewithzone_to_str(Time.zone.now-86400))
      return "昨日"
    end
    return now_time
  end
  
  def get_kifus_size(pagi_data,size=20)

    # pagination用のデータから合計サイズを抜き出す

    kifu_size = (pagi_data.length-1)*size + pagi_data[-1].length
    "#{kifu_size}件の棋譜"
  end

  def convert_usi_to_kifu(kifu_text, usi) 
    
    # -- usi形式の棋譜データをkifu型式の棋譜データに変換する --
    # kifu_text: List[n][i][j], usi: Hash{ n=> { pv=>, cp=> } }

    eng_to_koma = { "K"=> "王", "R"=> "飛", "B"=> "角", "G"=> "金", "S"=> "銀",
                    "N"=> "桂", "L"=> "香", "P"=> "歩"}
    # usiの回数分ループを回す
    for i in (0..(usi.length-1)) do
      board = kifu_text[i]
      pv = usi[i.to_s]["pv"].split
      new_pv = ""
      # itemの回数分ループを回す
      for j in (0..(pv.length-1)) do
        # pv[j] =  "G*33 1911 7722+" のような文字から
        # new_pv = "▲３三銀打 △１一飛(19) ▲２二角成(77) △投了" のような文字を作る

        item = pv[j]
        # 手番によって、itemの最初に▲か△をつける
        turn = ((i+j)%2 == 0 )? "▲": "△"
        
        if item == "resign"
          item = "投了" 

        # 持ち駒を使うとき
        elsif ( eng_to_koma.key?(item[0]) )
          koma = eng_to_koma[item[0]]

          # 盤面の情報だけ更新（持ち駒やどちらの駒かの更新は必要ない）
          board[item[3].to_i-1][9-item[2].to_i] = koma

          # 棋譜情報に追加する文字を作る
          item = convert_uppercase_and_kanji( transpose(item,[2,3]) )+ koma + "打"
        
        # 持ち駒を使わないとき
        else 
          koma = board[item[1].to_i-1][9-item[0].to_i]
          temp = (item[-1] == "+" && !flg_narigoma(koma) )? "成": ""
          # 成駒の表記を棋譜形式に変換する 
          koma = to_kifu_prot(koma)

          # 盤面の情報だけ更新（持ち駒やどちらの駒かの更新は必要ない）
          board[item[1].to_i-1][9-item[0].to_i] = ""
          board[item[3].to_i-1][9-item[2].to_i] = (temp =="成")? convert_nari(koma) :koma

          # 棋譜情報に追加する文字を作る
          item  = convert_uppercase_and_kanji( transpose(item,[2,3]) ) + 
                  koma + temp + 
                  "(" + transpose(item,[0,1]) + ")" 
        end

        new_pv += turn + item
        new_pv += " " if(j < (pv.length-1))
      end
      usi[i.to_s]["pv"] = new_pv.split
    end
    return usi
  end

  def transpose(str, list)

    # --文字列をlistの中の数字の順番に並び替える --
      
    ret = ""
    list.each do |i|
      ret += str[i] if(i < str.length)
    end
    return ret
  end

  def convert_uppercase_and_kanji(str)
    # -- "11" → "１一", "24" → "２四" のように、二桁の数字(String型)を大文字と漢字に変換する --
    str[0].tr('0-9','０-９') + $kanji_to_integer.key(str[1].to_i) 
  end

  def flg_narigoma(str)
    # -- 成駒かどうかを判定する --
    ["龍", "馬", "全", "圭", "杏", "と"].include?(str)
  end

  def to_kifu_prot(str)

    # -- 条件に合うように変換する。合わなければそのまま返す --
    
    case str

    when "全"
      return "成銀"

    when "圭"
      return "成桂"

    when "杏"
      return "成香"

    end
    return str
  end

end