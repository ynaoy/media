require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the KifusHelper. For example:
#
# describe KifusHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe KifusHelper, type: :helper do
  describe "my_kifu? and my_kifu_jwt?" do

    before do
      @user = FactoryBot.create(:user)
      @user2 = FactoryBot.create(:user,
                                  email:"user4@example.com")
      @kifu1 = FactoryBot.create(:kifu, user_id: @user.id)
      @kifu2 = FactoryBot.create(:kifu, user_id: @user2.id)
    end

    it "my_kifu? should work" do
      # 未ログイン時
      flg = helper.my_kifu?(@kifu1)
      expect(flg).to eq false
      # ログイン時
      session[:user_id] = @user.id
      flg = helper.my_kifu?(@kifu1)
      expect(flg).to eq true
      # ログイン時かつ他人の棋譜
      flg = helper.my_kifu?(@kifu2)
      expect(flg).to eq false
    end

    it "my_kifu_jwt? should work" do
      # 未ログイン時
      flg = helper.my_kifu_jwt?(nil, @kifu1)
      expect(flg).to eq false

      # ログイン時
      payload =  { user_id: @user.id }
      token = encode_token(payload)
      session[:user_id] = @user.id
      flg = helper.my_kifu_jwt?(token, @kifu1)
      expect(flg).to eq true

      # ログイン時かつ他人の棋譜
      flg = helper.my_kifu_jwt?(token, @kifu2)
      expect(flg).to eq false
    end
  end


  describe "kifu_to_board" do
    it "should work" do
      kifu = %w[７六歩(77) ８四歩(83) ２六歩(27) ８五歩(84) ２五歩(26) ３二金(41) ７七角(88) ３四歩(33) ７八銀(79) ７七角成(22)]
      kifu_text, kifu_flg = helper.kifu_to_board(kifu)
      expect(kifu_text).not_to be_empty
      expect(kifu_flg).not_to be_empty
    end
  end

  describe "fetch_data_from_content" do
    before do
      @content = "棋戦：
       戦型：
       開始日時：
       終了日時：
       手合割：平手
       先手：Player1
       後手：Player2
       手数----指手---------消費時間--
        1 ７六歩(77)        ( 0:01/00:00:01)
        2 ８四歩(83)        ( 0:02/00:00:02)
        まで2手で後手の勝ち"
    end

    it "valid data extracted kifu" do
      params = { title:"",
            player1:"",
            player2:"",
            content:@content
            }
      params = helper.fetch_data_from_content(params)
      expect(params[:player1]).to eq "Player1"
      expect(params[:player2]).to eq "Player2"
      expect(params[:win]).to eq 2
    end

    it "prior params than method" do
      params = { title:"",
            player1:"aaaa",
            player2:"bbbb",
            content:@content
            }
      params = helper.fetch_data_from_content(params)
      expect(params[:player1]).to eq "aaaa"
      expect(params[:player2]).to eq "bbbb"
    end
  end

  describe "win_or_lose" do

    before do
      @user = FactoryBot.create(:user)
      @kifu = FactoryBot.create(:kifu, user_id: @user.id)
    end

    it "should work" do
      win = helper.win_or_lose(2, @kifu)
      expect(win).to eq "win"
      win = helper.win_or_lose(1, @kifu)
      expect(win).not_to eq "win"
    end
  end

  
  describe "convert_usi_to_kifu" do
    it "should work" do

      #それぞれpvの値がtest_retの値に変換されていれば成功
      usi = { "0"=> { "cp"=> "0", "pv"=> "7776 3334 7675" } ,
              "1"=> { "cp"=> "1", "pv"=> "3334 2726" } ,
              "2"=> { "cp"=> "2", "pv"=> "8822+ 3122" } ,
              "3"=> { "cp"=> "3", "pv"=> "3122" } ,
              "4"=> { "cp"=> "4", "pv"=> "B*88" } ,
            }
      test_ret = [  "▲７六歩(77) △３四歩(33) ▲７五歩(76)",
                    "△３四歩(33) ▲２六歩(27)",
                    "▲２二角成(88) △２二銀(31)",
                    "△２二銀(31)",
                    "▲８八角打",               
                  ]
      kifu = %w[７六歩(77) ３四歩(33) ２二角成(88) ２二銀(31) ８八角打]
      kifu_text, kifu_flg = helper.kifu_to_board(kifu)
      expect(kifu_text).not_to be_empty

      ret = helper.convert_usi_to_kifu(kifu_text, usi)

      expect(ret.nil?).to eq false
      for n in 0..(ret.length-1) do
        expect(ret[n.to_s]["cp"].nil?).to eq false
        expect(ret[n.to_s]["pv"]).to eq test_ret[n]
      end
    end
  end

  describe "convert_uppercase_and_kanji" do
    it "should work" do
      ret = helper.convert_uppercase_and_kanji("11")
      expect(ret).to eq "１一"
    end
  end
end
