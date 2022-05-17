require "rails_helper"

RSpec.describe "KifusShows", type: :system do
  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu, user_id: @user.id,)
    @tag1 = FactoryBot.create(:tag, name:"こんばんは")
    @kifu_tag = @kifu.kifu_tags.build(tag_id:@tag1.id)
    @kifu_tag.save
  end

  describe "Kifu_Test" do

    it "change state" , js: true do

      visit kifu_path(id:@kifu.id)

      #最初はstateが0
      expect(page).to have_selector("#state", text: 0)

      #次へを押すとstateが0→1になる
      find("#next_1").click
      expect(page).to have_selector("#state", text: 1)

      #前へを押すとstateが1→0になる
      find("#back_1").click
      expect(page).to have_selector("#state", text: 0)

      #次へ×10を押すとstateが0→10になる
      find("#next_10").click
      expect(page).to have_selector("#state", text: 10)

      #state==max_stateだと次へを押しても値が変わらない
      2.times do
        find("#next_10").click
      end
      find("#next_1").click
      expect(page).to have_selector("#state", text: 30)#max_state=30

      #前へ×10を押すとstateが30→20になる
      find("#back_10").click
      expect(page).to have_selector("#state", text: 20)

      #state==0の状態で前へを押しても値が変わらない
      2.times do
        find("#back_10").click
      end
      find("#back_1").click
      expect(page).to have_selector("#state", text: 0)

    end

    it "display tags", js: true do
      visit kifu_path(id:@kifu.id)

      #id=tagsのwrapperが存在する
      expect(page).to have_selector("#tags")
      
      #tagの中身が存在する
      expect(page).to have_content(@tag1.name)
    end

    it "display normaly",js:true do
      visit kifu_path(id:@kifu.id)

      expect(page).to have_selector("#player")

      #駒がすべて正しい枚数表示されているなら
      text = ["飛","角","王","金","銀","桂","香"]
      within("#board") do
        for i in 0..(text.length-1) do
          (i<3)? num=2: num=4
          expect(page).to have_content(text[i],count:num)
        end
        expect(page).to have_content("歩", count: 18)
      end

    end

    it "display koma's move",js:true do
      visit kifu_path(id:@kifu.id)

      # 〇〇駒(××)、同　駒(××)、〇〇駒打、〇〇駒成(××)、〇〇成駒(××)、についてそれぞれテストする
      # 両プレイヤーの挙動を確認するためにそれぞれ二回テストする

      # ２六歩(27)、８四歩(83)で歩の移動後、歩が過不足なく表示されている
      find("#next_1").click
      within("#board") do
        expect(page).to have_content("歩", count: 18)
      end
      find("#next_1").click
      within("#board") do
        expect(page).to have_content("歩", count: 18)
      end

      3.times do
        find("#next_1").click
      end

      # 同　歩(23)、同　飛(28)で取った相手の駒とその枚数が表示されている
      # 画面上では"駒×1" html上では"駒\n×1"と表示される
      find("#next_1").click
      within("#left_board") do
        expect(page).to have_content("歩\n×1")
      end
      find("#next_1").click
      within("#right_board") do
        expect(page).to have_content("歩\n×1")
      end

      3.times do
        find("#next_1").click
      end

      # ２三歩打、８七歩打で "歩×2" が" 歩×1" に代わっている
      find("#next_1").click
      within("#right_board") do
        expect(page).to have_no_content("歩\n×2")
        expect(page).to have_content("歩\n×1")
      end
      find("#next_1").click
      within("#left_board") do
        expect(page).to have_no_content("歩\n×2")
        expect(page).to have_content("歩\n×1")
      end

      14.times do
        find("#next_1").click
      end

      # ２三銀成(34)、８七銀成(76)で銀が全に代わっている
      find("#next_1").click
      within("#board") do
        expect(page).to have_content("銀",count:3)
        expect(page).to have_content("全",count:1)
      end
      find("#next_1").click
      within("#board") do
        expect(page).to have_content("銀",count:2)
        expect(page).to have_content("全",count:2)
      end

      #３二成銀(23)、７八成銀(87)で全の移動後、全が過不足なく表示されている
      #成銀は画面上では全と表示される
      2.times do
        find("#next_1").click
        within("#board") do
          expect(page).to have_content("全",count:2)
        end
      end
    end

  end
end
