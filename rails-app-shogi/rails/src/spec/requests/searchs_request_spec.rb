require 'rails_helper'

RSpec.describe "Searchs", type: :request do

  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu,  user_id: @user.id,
                                      player2: @user.name)
  end

  describe "Get  /search" do
    it "returns http success" do
      get search_path, params: { query: @user.name } 
      expect(response).to have_http_status(:success)
    end

    it "returns json object" do
      get search_path,  params: { query: @user.name,
                                  format: "json" } 
      expect(JSON.parse(response.body)['users'].nil?).to eq false
      expect(JSON.parse(response.body)['kifus'].nil?).to eq false
    end
  end

end
