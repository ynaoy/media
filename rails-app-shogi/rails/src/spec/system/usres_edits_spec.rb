require 'rails_helper'

RSpec.describe "UsresEdits", type: :system do
  before do
    @user = FactoryBot.create(:user)
  end

  describe "edit_test" do

    it "not display with not loged in " do
      visit edit_user_path(@user)
      expect(page).to have_no_content("編集")
    end

    it "invalid edit information" do
      log_in_e2e(@user) 
      visit edit_user_path(@user)
      fill_in "ユーザー名",      with: ""
      # 編集をクリックする
      click_on "編集"
      expect(page).to have_selector("#error_explanation")
      click_link(href:root_url)
      expect(page).not_to have_selector("#error_explanation")
    end

    it "valid edit information" do
      log_in_e2e(@user) 
      visit edit_user_path(@user)
      old_name = @user.name
      new_name = "New_User"
      fill_in "ユーザー名",     with: new_name
      # 編集をクリックする
      click_on "編集"
      sleep 10
      expect(page).to have_no_content(old_name)
      expect(page).to have_content(new_name)
    end
  end
end
