require 'rails_helper'

RSpec.describe "UsersSignups", type: :system do

  #fixcturesの使い方用に残しとく
  """
    fixtures :users
    let(:user){ users(:one) }
  """
  before do
    @user = FactoryBot.create(:user)
  end

  describe "Signup_test" do

    it "invalid signup information" do
      visit signup_path

      fill_in "ユーザー名",      with: ""
      fill_in "メールアドレス",  with: ""
      fill_in "パスワード",      with: ""
      fill_in "パスワードの確認", with: ""
      # 作成をクリックする
      click_on "作成"
      expect(page).to have_selector("#error_explanation")
      click_link(href:root_url)
      expect(page).not_to have_selector("#error_explanation")
    end

    it "valid signup information" do
      visit signup_path

      fill_in "ユーザー名",     with: "User4"
      fill_in "メールアドレス", with: "user4@example.com"
      fill_in "パスワード",     with: "password"
      fill_in "パスワードの確認",with: "password"
      # 作成をクリックする
      click_on "作成"
      #expect(page).to have_no_link(href:login_path)
      #expect(page).to have_link(href:logout_path)
    end
  end

end
