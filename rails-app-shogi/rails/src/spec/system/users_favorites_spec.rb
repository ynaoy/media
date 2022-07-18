require 'rails_helper'

RSpec.describe "UsersFavorites", type: :system do
  before do
    @user = FactoryBot.create(:user)
    @kifu_list = make_kifus(user_id:@user.id, n:2)
    2.times do |i|
      FactoryBot.create(:favorite, user_id:@user.id, kifu_id:@kifu_list[i].id)
    end
    @favorite_path = user_path(@user)+"/favorite"
  end

  describe "Users_favorites_test" do

    it "not display with not loged in " do

      #users/:id/favoriteに遷移する
      visit @favorite_path
      expect(current_url).to eq login_url
      expect(page).to have_selector("h1", text: "ログイン")

    end

    it "display normally " do

      #users/:id/favoriteに遷移する
      log_in_e2e(@user)
      visit @favorite_path
      expect(current_url).to eq user_url(@user)+"/favorite"
      expect(page).to have_selector("h1",text: "お気に入り")

      @kifu_list.each do |kifu| 
        expect(page).to have_content(kifu.title)
      end

    end
  end

end
