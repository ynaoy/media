require 'rails_helper'

RSpec.describe History, type: :model do

  before do
    @user = FactoryBot.create(:user,name:"Sample_user")
    @kifu = FactoryBot.create(:kifu,user_id:@user.id)
    @history = FactoryBot.create(:history,
                                  user_id:@user.id,
                                  kifu_id:@kifu.id)
    
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

  it "History.hist_and_kifus should work" do
    histories = History.hist_and_kifus(@user.id)
    expect(histories).not_to be_nil
    expect(histories).not_to be_empty

    history = histories.first
    expect(history.id).to be @kifu.id
    expect(history.created_at).to eq @kifu.created_at
    expect(history.watch_at).to eq @history.created_at
  end

end
