module KifusHelper

  # loginしているuserのidとKifuモデルのuser_idが一致するかどうかを調べる
  def my_kifu?(kifu)
    current_user.nil? ? false : current_user.id == kifu.user_id
  end

  # 指し手の集まりをviewに渡す形式に変換する
  def kifu_to_board(kifu_list)
    old_pos = [0,0]
    turn = 1

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

    for n in 0..(kifu_list.length-1) do
      (n%2==0)? turn=1: turn=2
      old_text_list = return_text_lists[n].deep_dup
      old_flg_list = return_flg_lists[n].deep_dup

      text_list, flg_list, old_pos =
                        extract_text_and_flg(kifu_list[n], old_text_list, old_flg_list, turn, old_pos)
      return_text_lists.push(text_list)
      return_flg_lists.push(flg_list)
    end

    return return_text_lists,return_flg_lists
  end

  #kifu_strをtext,flg,indexに変換
  def extract_text_and_flg(kifu_str, text_list, flg_list, turn, old_pos)
    # 〇〇駒成(××)、〇〇成駒(××)、同駒(××)、〇〇駒打、〇〇駒(××)の５つをパターン分けして処理する
    # ××にある駒が〇〇に移動する

    if(kifu_str[3] == "成") # 例: ３二銀成(33) → ３二全(33)、２二桂成(23) →２二圭(23)
      kifu_str[2] = convert_nari(kifu_str[2])
      kifu_str.slice!(3)
    end

    if(kifu_str[2] == "成") # 例: ３二成銀(33) → ３二全(33)、 ２二成桂(23) →２二圭(23)
      kifu_str[3] = convert_nari(kifu_str[3])
      kifu_str.slice!(2)
    end

    # textとflgの今いる駒の位置を取得
    x = 8-(kifu_str[4].to_i-1) # kifu_strでは始点が右上なのでlist形式で使えるように左上に変更する
    y = kifu_str[5].to_i-1

    # textとflgの次に進む位置を取得
    if(kifu_str[0] == "同") # 同〇では直前の相手の駒の位置に移動する
      next_x = old_pos[0]
      next_y = old_pos[1]
    else 
      next_x,next_y = convert_xy(kifu_str)
    end

    # textとflgを次の状態にupdateする
    if(kifu_str[-1] == "打") 
      text_list, flg_list =
        update_text_and_flg(text_list, flg_list, kifu_str, turn, nil, nil, next_x, next_y)
    else
      text_list, flg_list = 
        update_text_and_flg(text_list, flg_list, kifu_str, turn, x, y, next_x, next_y)
    end

    return text_list, flg_list, [next_x,next_y]
  end

  #textとflgをstrとturnでupdateする
  def update_text_and_flg(text_list, flg_list, kifu_str, turn, x, y, next_x, next_y)
    sub_board_dict = {"飛"=> 0, "角"=> 1, "金"=> 2, "銀"=> 3, "桂"=> 4, "香"=> 5, "歩"=> 6, "玉"=> 7,
                      "龍"=> 0, "馬"=> 1,           "全"=> 3, "圭"=> 4, "杏"=> 5, "と"=> 6,}

    if(text_list[next_y][next_x]!= "")
      #移動先に相手の駒がある時、先手ならflg[9][index]、後手ならflg[10][index]に取った駒を追加する
      flg_list[8+turn][sub_board_dict[text_list[next_y][next_x]]] +=1
    end

    if(kifu_str[-1] == "打") #sub_boardから駒を使うとき
      flg_list[8+turn][sub_board_dict[kifu_str[2]]] -=1
    end

    if(!(x.nil? || y.nil?)) #〇〇打の時は元いた位置はtextとflgには関係しない
      #元々駒がいた位置のtextを空に、flgを0に
      text_list[y][x] = ""
      flg_list[y][x] = 0
    end

    #進んだ位置のtextを変更、flgをturnに
    text_list[next_y][next_x] = kifu_str[2]
    flg_list[next_y][next_x] = turn

    return text_list,flg_list
  end

  #kifu_str[3]が成の時にstrを変換する　例:歩→と 飛→龍
  def convert_nari(str)
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

  #kifu_strの３四や２五等を半角数字に変換する
  def convert_xy(kifu)
    kanji_to_integer = {"一"=> 1, "二"=> 2, "三"=> 3, "四"=> 4, "五"=> 5, "六"=> 6, "七"=> 7, "八"=> 8, "九"=> 9}
    x = 8-(kifu[0].tr('０-９','0-9').to_i-1)
    y = kanji_to_integer[kifu[1]]-1
    return x,y
  end

  #params[:content]からplayer1、player2、winを取り出してparamに含める
  def convert_data_from_content(params)

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

  #棋譜一覧表示時に勝った方にidを付与する
  def win_or_lose(win,kifu)
    "win" if win == kifu.win
  end

  #Timewithzoneクラスから" + "までの情報を抜き出して文字列型で返す
  def timewithzone_to_str(date)
     date.to_s.match(/[^+]*/)[0]
  end

  #pagination用のデータから合計サイズを抜き出す
  def get_kifus_size(pagi_data,size=20)
    kifu_size = (pagi_data.length-1)*size + pagi_data[-1].length
    "#{kifu_size}件の棋譜"
  end
end
