require 'rails_helper'

RSpec.describe "UsersShows", type: :system do
  before do

    @user = FactoryBot.create(:user)
    @kifus = make_kifus(user_id:@user.id, player2:@user.name, n:40)
    @user2 = FactoryBot.create(:user,
                                name: "user20",
                                email: "user20@example.com",
                                password: "password",
                                password_confirmation: "password",
                                admin: false,
                                  )
  
                                end

  describe "Users_index_test" do

    it "display normaly to watch my userpage " do
      log_in_e2e(@user) 
      #users/showに遷移する
      visit user_path(@user)
      expect(page).to have_content(@user.name)
      expect(page).to have_content("[編集]")
      expect(page).to have_content("#{@kifus.length}件の棋譜")
      expect(page).to have_selector(".pagination")
      for i in 0..19 do
        expect(page).to have_content(@kifus[i].title)
      end

    end

    it "display normaly to watch another userpage " do
      log_in_e2e(@user) 
      #users/showに遷移する
      visit user_path(@user2)
      expect(page).to have_content(@user2.name)
      expect(page).to have_no_content("[編集]")
      expect(page).to have_content("0件の棋譜")
      expect(page).to have_content("このユーザーには棋譜がありません。")
      expect(page).to have_no_selector(".pagination")
    end
  end
end
