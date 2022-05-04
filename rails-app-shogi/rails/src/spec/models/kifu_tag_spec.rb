require 'rails_helper'

RSpec.describe KifuTag, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu, user_id: @user.id)
    @kifu_tag = @kifu.kifu_tags.build(tag_id:0)
  end

  it "should be valid" do
    expect(@kifu_tag).to be_valid
  end

  it "tag_id should be present" do
    @kifu_tag.tag_id = "  "
    expect(@kifu_tag).not_to be_valid
  end

  it "kifu_id should be present" do
    @kifu_tag.kifu_id = "  "
    expect(@kifu_tag).not_to be_valid
  end

end
