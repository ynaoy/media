require 'rails_helper'

RSpec.describe "UsersLogins", type: :system do

  before do
    @user = FactoryBot.create(:user)
  end

  describe "Login_test" do

    it "login with invalid information" do
      visit login_path
      fill_in "メールアドレス", with: ""
      fill_in "パスワード", with: ""
      click_on "ログインする"
      expect(page).to have_selector("#error_explanation")
      click_link(href:root_url)
      expect(page).not_to have_selector("#error_explanation")
    end

    it "login with valid information" do
      visit login_path
      fill_in "メールアドレス", with: @user.email
      fill_in "パスワード", with: "password"
      # ログインボタンをクリックする
      click_on "ログインする"
      expect(page).to have_no_link(href:login_path)
      expect(page).to have_link(href:logout_path)
      click_link(href:logout_path)
      expect(page).to have_link(href:login_path)
      expect(page).to have_no_link(href:logout_path)
    end
  end

end
