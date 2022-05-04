require 'rails_helper'

RSpec.describe "KifusCreates", type: :system do

  before do
    @user = FactoryBot.create(:user)
    @tag = FactoryBot.create(:tag)
    @content = "棋戦：
           戦型：
           開始日時：
           終了日時：
           手合割：平手
           先手：Player1
           後手：Player2
           手数----指手---------消費時間--
           1 ７六歩(77)        ( 0:01/00:00:01)
           2 ８四歩(83)        ( 0:02/00:00:02)
           3 ２六歩(27)        ( 0:01/00:00:02)
           4 ８五歩(84)        ( 0:01/00:00:03)
           5 ２五歩(26)        ( 0:01/00:00:03)
           6 ３二金(41)        ( 0:01/00:00:04)
           7 ７七角(88)        ( 0:01/00:00:04)
           8 ３四歩(33)        ( 0:01/00:00:05)
           9 ７八銀(79)        ( 0:01/00:00:05)
           10 ７七角成(22)       ( 0:01/00:00:06)
           まで10手で後手の勝ち"
  end

  it "forced login" do

    visit new_kifu_path
    expect(page).to have_selector("#error_explanation")
  end

  it "content is empty", js: true do

    log_in_e2e(@user)
    visit new_kifu_path

    fill_in "タイトル",     with: ""
    fill_in "先手", with: ""
    fill_in "後手",     with: ""
    fill_in "棋譜",with: ""
    # 棋譜を入力せずに作成をクリックする
    click_on "作成"
    expect(page).to have_content("棋譜を追加")
  end

  it "valid kifus information", js: true do

    log_in_e2e(@user)
    visit new_kifu_path

    fill_in "タイトル",     with: ""
    fill_in "先手", with: ""
    fill_in "後手",     with: ""
    fill_in "棋譜",with: @content
    page.has_css?('#kifu_tag_tag_ids_1')
    find('input[type="checkbox"]').click#タグを選択
    # 作成をクリックする
    click_on "作成"

    #正しいページにリダイレクトしたか確認
    text = ["飛","角","金","銀","桂","香","歩","王"]
    for t in text do
      expect(page).to have_content(t)
    end
  end
end
