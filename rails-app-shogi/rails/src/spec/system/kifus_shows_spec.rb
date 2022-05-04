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

    it "display normaly",js:true do
      visit kifu_path(id:@kifu.id)

      text = ["飛","角","金","銀","桂","香","歩","王"]
      for t in text do
        expect(page).to have_content(t)
      end

      expect(page).to have_selector("#player")
    end

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
      find("#next_1").click
      expect(page).to have_selector("#state", text: 10)

      #前へ×10を押すとstateが10→0になる
      find("#back_10").click
      expect(page).to have_selector("#state", text: 0)
      #state==0だと前へを押しても値が変わらない
      find("#back_1").click
      expect(page).to have_selector("#state", text: 0)

    end

    it "display tags", js: true do
      visit kifu_path(id:@kifu.id)
      #id=tagsのwrapperが存在するか確認
      expect(page).to have_selector("#tags")
      #tagの中身が存在するか確認
      expect(page).to have_content(@tag1.name)
    end

  end
end
