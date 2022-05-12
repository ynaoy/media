require 'rails_helper'

RSpec.describe History, type: :model do

  before do
    @user = FactoryBot.create(:user,name:"Sample_user")
    @history = @user.histories.build(kifu_id:1)
  end

  it "should be valid" do
    expect(@history).to be_valid
  end

  it "user_id should not presence" do
    @history.user_id = nil
    expect(@history).not_to be_valid
  end

  it "kifu_id should not be presence" do
    @history.kifu_id = nil
    expect(@history).not_to be_valid
  end

end
