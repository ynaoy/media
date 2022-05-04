require 'rails_helper'

RSpec.describe Tag, type: :model do
  before do
    @tag = FactoryBot.create(:tag)
  end

  it "should be valid" do
    expect(@tag).to be_valid
  end

  it "name should be present" do
    @tag.name = " "
    expect(@tag).not_to be_valid
  end

end
