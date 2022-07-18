require 'rails_helper'

RSpec.describe "Layouts", type: :system do
  before do
    @user = FactoryBot.create(:user)
  end

  describe "Header Test" do

    describe "Display Test" do
      it "display normaly with not login " do

        visit root_url(@user)
        expect(page).to have_selector("a",text:"将棋のお時間")
        expect(page).to have_selector("input[type='text']")
        expect(page).to have_selector("input[type='submit']")
        expect(page).to have_selector("a",text:"ログイン")
        expect(page).to have_selector("a",text:"新規登録")

      end

      it "display normaly with login " do

        log_in_e2e(@user) 

        visit root_url(@user)
        expect(page).to have_selector("a",text:"将棋のお時間")
        expect(page).to have_selector("input[type='text']")
        expect(page).to have_selector("input[type='submit']")
        expect(page).to have_selector("a",text:@user.name)
        expect(page).to have_selector(".dropdown-menu")
        find(".dropdown-menu").click
        expect(page).to have_selector("a",text:"Settings")
        expect(page).to have_selector("a",text:"Log out")

      end
    end

    describe "Move to Test" do
      it "将棋のお時間 move to root_url " do

        visit user_path(@user)
        click_on "将棋のお時間"
        expect(current_url).to eq root_url 

        log_in_e2e(@user) 
        visit user_path(@user)
        click_on "将棋のお時間"
        expect(current_url).to eq root_url

      end

      it "検索 move to search_url " do

        visit user_path(@user)
        fill_in "query", with: "hello"
        click_on "検索"
        expect(current_url).to eq search_url+"?query=hello&"+URI.encode_www_form(commit: "検索")

        log_in_e2e(@user) 
        fill_in "query", with: "hello"
        click_on "検索"
        expect(current_url).to eq search_url+"?query=hello&"+URI.encode_www_form(commit: "検索")

      end

      it "ログイン move to login_url " do

        visit user_path(@user)
        click_on "ログイン"
        expect(current_url).to eq login_url 

      end

      it "新規登録 move to signup_url " do

        visit user_path(@user)
        click_on "新規登録"
        expect(current_url).to eq signup_url

      end

      it "Setting move to edit_user_path(@user) " do

        log_in_e2e(@user) 

        visit user_path(@user)
        expect(page).to have_selector(".dropdown-menu")
        find(".dropdown-menu").click
        click_on "Setting"
        expect(current_url).to eq edit_user_url(@user)

      end

      it "Log out work " do

        log_in_e2e(@user) 

        visit user_path(@user)
        expect(page).to have_selector(".dropdown-menu")
        find(".dropdown-menu").click
        click_on "Log out"

        expect(page).to have_selector("a",text:"ログイン")
        expect(page).to have_selector("a",text:"新規登録")

      end
    end

  end
end
