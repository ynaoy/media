require 'rails_helper'

RSpec.describe "Sessions", type: :request do

  before do
    @user = FactoryBot.create(:user)
  end

  describe "GET /new" do
    it "returns http success" do
      get login_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "Post /create" do
    it "returns http redirect" do
      post login_path, params: { session: { email: @user.email,
                                          password: "password" } }
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
      expect(is_logged_in?).to be_truthy
    end

    it "returns json error" do
      post login_path, params: { session: { email: @user.email,
                                          password: "falsepassword" },
                                 format: "json" }
      expect(response).to have_http_status(401)
      expect(JSON.parse(response.body)['status']).to eq 401
    end

    it "returns http object" do
      post login_path, params: { session: { email: @user.email,
                                          password: "password" },
                                format: "json" }
      expect(JSON.parse(response.body)['jwt'].nil?).to eq false
    end

  end

  describe "Delete /destroy" do
    it "returns http redirect" do
      post login_path, params: { session: { email:    @user.email,
                                            password: 'password' } }
      delete logout_path
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
    end
  end
end

