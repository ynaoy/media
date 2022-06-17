require 'rails_helper'

RSpec.describe "Favorites", type: :request do

  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu, user_id: @user.id)
  end

  describe "Post /create" do
    it "returns http success" do
      log_in_as @user

      post "/favorites",
        params: {
          favorite:{ kifu_id: @kifu.id }
        }
      expect(response).to have_http_status(:success)
    end
  end

  describe "Delete /destroy" do
    it "returns http redirect" do
      log_in_as @user
      FactoryBot.create(:favorite, user_id: @user.id, kifu_id: @kifu.id)

      delete "/favorites", 
        params: {
          favorite:{ kifu_id: @kifu.id}
        }
      expect(response).to have_http_status(:success)
    end
  end
end
