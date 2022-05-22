require 'rails_helper'

RSpec.describe Favorite, type: :model do
  before do
    @user = FactoryBot.create(:user,name:"Sample_user")
    @kifu = FactoryBot.create(:kifu,user_id:@user.id)
    @favorite = FactoryBot.create(:favorite,
                                  user_id:@user.id,
                                  kifu_id:@kifu.id)
    
  end

  it "should be valid" do
    expect(@favorite).to be_valid
  end

  it "user_id should not presence" do
    @favorite.user_id = nil
    expect(@favorite).not_to be_valid
  end

  it "kifu_id should not be presence" do
    @favorite.kifu_id = nil
    expect(@favorite).not_to be_valid
  end

  it "kifu_id scoeped user_id should be unique" do
    @favorite2 = FactoryBot.build(:favorite,
                                  user_id:@user.id,
                                  kifu_id:@kifu.id)
    expect(@favorite2).not_to be_valid
  end

  it "Favorite.favorite_kifus should work" do
    favorites = Favorite.favorite_kifus(@user.id)
    expect(favorites).not_to be_nil
    expect(favorites).not_to be_empty

    favorite = favorites.first
    expect(favorite.id).to be @kifu.id
    expect(favorite.created_at).to eq @kifu.created_at
    expect(favorite.watch_at).to eq @favorite.created_at
  end
end

