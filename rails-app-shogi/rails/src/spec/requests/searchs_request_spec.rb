require 'rails_helper'

RSpec.describe "Searchs", type: :request do

  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu, user_id: @user.id)
  end

  describe "Get  /search" do
    it "returns http success" do
      get search_path, params: { query: @user.name } 
      expect(response).to have_http_status(:success)
    end
  end

end
