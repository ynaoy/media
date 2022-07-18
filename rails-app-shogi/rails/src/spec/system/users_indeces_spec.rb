require 'rails_helper'

RSpec.describe "UsersIndeces", type: :system do

  before do

    @admin_user = FactoryBot.create(:user)
    @users = make_users()

  end

  describe "Users_index_test" do

    it "not display with not loged in " do

      #users/indexに遷移する
      visit users_path
      expect(page).to have_no_selector(".pagination")
      for i in 0..19 do
        expect(page).to have_no_content(@users[i].name)
        expect(page).to have_no_content("delete")
      end

    end

    it "not display with not admin " do

      #adminではないユーザーでログインする
      log_in_e2e(@users[20]) #1ページ目に表示されていないユーザーでログイン

      #users/indexに遷移する
      visit users_path
      expect(page).to have_no_selector(".pagination")
      for i in 0..19 do
        expect(page).to have_no_content(@users[i].name)
        expect(page).to have_no_content("delete")
      end

    end

    it "display normaly " do

      log_in_e2e(@admin_user) 
      expect(page).to have_no_link(href:login_path)
      expect(page).to have_link(href:logout_path)

      #users/indexに遷移する
      visit users_path
      expect(page).to have_selector(".pagination")
      for i in 0..19 do
        expect(page).to have_content(@users[i].name)
        expect(page).to have_content("delete")
      end

    end

    it "work paginate " do

      log_in_e2e(@admin_user) 
      expect(page).to have_no_link(href:login_path)
      expect(page).to have_link(href:logout_path)

      #users/indexに遷移する
      visit users_path
      
      work_paginate(users:@users)

    end

    it "work jump page", js: true do

      log_in_e2e(@admin_user)
      #users/indexに遷移する
      visit users_path

      #users/showに遷移する
      first("#user_name").click
      sleep 10
      expect(page).to have_content(@users[0].name)
      expect(page).to have_content("0件の棋譜")
      expect(page).to have_content("このユーザーには棋譜がありません。")
    end

    it "work delete button ", js: true do 

      log_in_e2e(@admin_user) 
      expect(page).to have_no_link(href:login_path)
      #expect(page).to have_link(href:logout_path)

      #users/indexに遷移する
      visit users_path
      user_name = @users[0].name
      expect(page).to have_content(user_name)
      
      #ユーザーを削除する
      page.accept_confirm do
        all("#delete")[0].click
      end
      sleep 10
      #削除後再度users/index画面に戻っているか確認
      for i in 1..19 do
        expect(page).to have_content(@users[i].name)
        expect(page).to have_content("delete")
      end
      #削除したユーザーが表示されていないか確認
      expect(page).to have_no_content(user_name)

      #paginationで遷移先でも正しく動くかテスト

      #次のページへ遷移する
      click_on "次", match: :first
      #ユーザーを削除する
      page.accept_confirm do
        all("#delete")[0].click
      end
      sleep 10
      #削除後再度users/index画面に戻っているか確認
      for i in 22..41 do
        expect(page).to have_content(@users[i].name)
        expect(page).to have_content("delete")
      end
    end

  end
end
