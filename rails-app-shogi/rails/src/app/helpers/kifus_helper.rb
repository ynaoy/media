module KifusHelper
  # kifusをviewに渡す形式に変換する
  def kifu_to_board(kifus)
    last_ind = [0,0]
    turn = 1
    kifu_text = [
                  [["香","桂","銀","金","王","金","銀","桂","香"],
                  ["","飛","","","","","","角",""],
                  ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
                  ["","","","","","","","",""],
                  ["","","","","","","","",""],
                  ["","","","","","","","",""],
                  ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
                  ["","角","","","","","","飛",""],
                  ["香","桂","銀","金","王","金","銀","桂","香"]]
                ]
    kifu_flg =  [
                  [[2,2,2,2,2,2,2,2,2],
                  [0,2,0,0,0,0,0,2,0],
                  [2,2,2,2,2,2,2,2,2],
                  [0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0],
                  [1,1,1,1,1,1,1,1,1],
                  [0,1,0,0,0,0,0,1,0],
                  [1,1,1,1,1,1,1,1,1],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0]]
                ]
    for n in 0..(kifus.length-1) do
      (n%2==0)? turn=1:turn=2
      last_text = kifu_text[n].deep_dup
      last_flg = kifu_flg[n].deep_dup

      text, flg, last_ind = get_text_and_flg(kifus[n], last_text, last_flg, turn, last_ind)
      kifu_text.push(text)
      kifu_flg.push(flg)
    end
    return kifu_text,kifu_flg
  end

  #kifuとtext,flg,indexに変換
  def get_text_and_flg(kifu, text, flg, turn, last_ind)
    sub_board_ind = {"飛"=> 0, "角"=> 1, "金"=> 2, "銀"=> 3, "桂"=> 4, "香"=> 5, "歩"=> 6, "玉"=> 7,
                     "龍"=> 0, "馬"=> 1,           "全"=> 3, "圭"=> 4, "杏"=> 5, "と"=> 6,}

    if(kifu[3] == "成")
      kifu[2] = convert_str(kifu[2])
      kifu.slice!(3)
    end

    #３二成銀、４五成桂のような棋譜を３二全、４五圭のように変換する
    if(kifu[2] == "成")
      kifu.slice!(2)
      kifu[2] = convert_str(kifu[2])
    end

    x = kifu[4].to_i-1
    y = kifu[5].to_i-1

    if(kifu[0] == "同")

      next_x = last_ind[0]
      next_y = last_ind[1]

      #flgの持ち駒ゾーンに取った駒を追加する
      if(text[next_y][8-next_x]!= "")
        flg[8+turn][sub_board_ind[text[next_y][8-next_x]]] +=1
      end

      text[y][8-x] = ""
      flg[y][8-x] = 0

      text[next_y][8-next_x] = kifu[2]
      flg[next_y][8-next_x] = turn
    else

      next_x,next_y = convert_xy(kifu)

      if(kifu[-1] == "打")

        text[next_y][8-next_x] = kifu[2]
        flg[next_y][8-next_x] = turn

        #flgの持ち駒ゾーンから使う駒を減らす
        flg[8+turn][sub_board_ind[kifu[2]]] -=1

      else

        #flgの持ち駒ゾーンに取った駒を追加する
        if(text[next_y][8-next_x]!= "")
          flg[8+turn][sub_board_ind[text[next_y][8-next_x]]] +=1
        end

        text[y][8-x] = ""
        flg[y][8-x] = 0

        text[next_y][8-next_x] = kifu[2]
        flg[next_y][8-next_x] = turn

      end

    end

    return text, flg, [next_x,next_y]
  end

  #kifu[3]が成の時にstrを変換する　例:歩→と 飛→龍
  def convert_str(str)
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

  #kifuの３四や２五等を半角数字に変換する
  def convert_xy(kifu)
    kanji_to_integer = {"一"=> 1, "二"=> 2, "三"=> 3, "四"=> 4, "五"=> 5, "六"=> 6, "七"=> 7, "八"=> 8, "九"=> 9}
    x = kifu[0].tr('０-９','0-9').to_i-1
    y = kanji_to_integer[kifu[1]]-1
    return x,y
  end

  #params[:content]からデータを取り出す
  def get_data_from_content(params)

    reg = /[先|後]手：.{,10}/
    reg_win = /[先|後]手の勝ち/
    player = params[:content].scan(reg)
    if !player.empty?
      params[:player1] = player[0][3..] if( params[:player1]=="" )
      params[:player2] = player[1][3..] if( params[:player2]=="" )
    end
    win = params[:content].scan(reg_win)

    params[:win] = if !win.empty?
      1 if( win[0] == "先手の勝ち" )
      2 if( win[0] == "後手の勝ち" )
    else
      0
    end
    return params
  end

  #棋譜一覧表示時に勝っているほうにidを付与する
  def win_or_lose(win,kifu)
    "win" if win == kifu.win
  end

  #Timewithzoneクラスから必要な情報を抜き出して文字列型で返す
  def timewithzone_to_str(date)
     date.to_s.match(/[^+]*/)[0]
  end

end
