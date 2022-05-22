require 'rails_helper'

RSpec.describe "UsersShows", type: :system do
  before do

    @user = FactoryBot.create(:user)
    @kifus = make_kifus(user_id:@user.id, player2:@user.name, n:60)
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

    it "work delete button ", js: true do 

      log_in_e2e(@user) 

      #users/showに遷移する
      visit user_path(@user)
      expect(page).to have_content(@user.name)
      
      #記譜を削除する
      page.accept_confirm do
        all("#delete")[0].click
      end
      sleep 10
      #削除後再度users/show画面に戻っているか確認
      for i in 1..19 do
        expect(page).to have_content(@kifus[i].title)
        expect(page).to have_content("delete")
      end
      #削除した棋譜が表示されていないか確認
      expect(page).to have_no_content(@kifus[0].title)

      #paginationで遷移先でも正しく動くかテスト

      #次のページへ遷移する
      click_on "次", match: :first
      #ユーザーを削除する
      page.accept_confirm do
        all("#delete")[0].click
      end
      sleep 10
      #削除後再度users/show画面に戻っているか確認
      for i in 22..41 do
        expect(page).to have_content(@kifus[i].title)
        expect(page).to have_content("delete")
      end
    end
  end
end
