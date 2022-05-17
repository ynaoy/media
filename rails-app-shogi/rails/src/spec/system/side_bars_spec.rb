require 'rails_helper'

RSpec.describe "SideBars", type: :system do
  before do
    @user = FactoryBot.create(:user)
    @tags = %w[相掛かり 矢倉 角換わり 横歩取り 三間飛車 四間飛車 角交換四間飛車 角交換中飛車]
  end

  describe "Sidebar Test" do

    describe "Display Test" do
      it "display normaly with not login " do

        visit root_url
        expect(page).to have_selector("div",text:"好みの棋譜を探す")
        @tags.each do |tag|
          expect(page).to have_selector("a",text:tag)
        end 

      end

      it "display normaly with login " do

        log_in_e2e(@user) 

        visit root_url
        expect(page).to have_selector("a",text:"マイページ")
        expect(page).to have_selector("a",text:"お気に入り")
        expect(page).to have_selector("a",text:"棋譜を追加")
        expect(page).to have_selector("a",text:"閲覧履歴")
        expect(page).to have_selector("div",text:"好みの棋譜を探す")
        @tags.each do |tag|
          expect(page).to have_selector("a",text:tag)
        end 
      end

    end

    describe "Move to Test" do
      it "tags move to search_url " do

        @tags.each do |tag|
          visit root_url
          click_on tag
          expect(current_url).to eq search_url+"?"+URI.encode_www_form(query: tag)
        end

        log_in_e2e(@user) 
        @tags.each do |tag|
          visit root_url
          click_on tag
          expect(current_url).to eq search_url+"?"+URI.encode_www_form(query: tag)
        end

      end

      it "マイページ move to user_url(@user) " do

        log_in_e2e(@user) 
        visit root_url
        click_on "マイページ"
        expect(current_url).to eq user_url(@user)

      end

      it "お気に入り move to user_url(@user)+'/favorite' " do
        
        log_in_e2e(@user) 
        visit root_url
        click_on "お気に入り"
        #expect(current_url).to eq user_url(@user)+'/favorite'

      end

      it "棋譜を追加 move to new_kifu_url " do

        log_in_e2e(@user) 
        visit root_url
        click_on "棋譜を追加"
        expect(current_url).to eq new_kifu_url

      end

      it "閲覧履歴 move to user_url(@user)+'/history' " do

        log_in_e2e(@user) 
        visit root_url
        click_on "閲覧履歴"
        expect(current_url).to eq user_url(@user)+'/history'

      end

    end

  end
end
