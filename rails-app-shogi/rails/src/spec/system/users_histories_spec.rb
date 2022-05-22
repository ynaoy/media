require 'rails_helper'

RSpec.describe "UsersHistories", type: :system do
  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu, title:"title", user_id: @user.id,)
    @histories = make_records("history",user_id:@user.id, kifu_id:@kifu.id)
    @history_path = user_path(@user)+"/history"
  end

  describe "Users_histories_test" do

    it "not display with not loged in " do

      #users/:id/historyに遷移する
      visit @history_path
      expect(page).to have_selector("h1", text: "ログイン")

    end

    it "display normally " do

      #users/:id/historyに遷移する
      log_in_e2e(@user)
      visit @history_path
      expect(page).to have_selector("h1",text: "閲覧履歴")

      #kifuを見た日付が正しく表示されているか確認
      expect(page).to have_selector("h3", text: "今日")
      expect(page).to have_selector("h3", text: "昨日")
      expect(page).to have_selector("h3",
          text: timewithzone_to_str(@histories[-1].created_at)
      )

      #１日に同じページを複数回閲覧している場合１度だけ表示される。
      #３日分計３回表示されている
      expect(page).to have_content("title", count:3)

    end
  end
end
