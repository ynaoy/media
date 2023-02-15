require 'rails_helper'

RSpec.describe Kifu, type: :model do

  before do
    @user = FactoryBot.create(:user)
    @kifu = @user.kifus.build(content:
                              "棋戦：test
                              手合割：平手
                              先手：User1
                              後手：User2
                              手数----指手---------消費時間--
                                  1 ７六歩(77)        ( 0:01/00:00:01)
                                  2 ８四歩(83)        ( 0:02/00:00:02)
                              ")
  end

  it "should be valid" do
    expect(@kifu).to be_valid
  end

  it "content should be present" do
    @kifu.content = "     "

    expect(@kifu).not_to be_valid
  end

  it "player1 should be less than 10 character" do
    @kifu.player1 = "AAAAAAAAAAAAAAAAAAAA"
    expect(@kifu).not_to be_valid
  end

  it "player2 should be less than 10 character" do
    @kifu.player2 = "AAAAAAAAAAAAAAAAAAAA"
    expect(@kifu).not_to be_valid
  end

  it "extract_kifu should not be empty" do
    expect(@kifu.extract_kifu).not_to be_empty
  end

  it "search_kifu_by_tag should be work" do
    tag = FactoryBot.create(:tag, name: "相掛かり")
    kifu = FactoryBot.create(:kifu, user_id: @user.id)
    kifu_tag = kifu.kifu_tags.build(tag_id: tag.id)
    kifu_tag.save
    expect(Kifu.search_kifu_by_tag(tag_str = "相掛かり").length).to eq 1
  end

end
