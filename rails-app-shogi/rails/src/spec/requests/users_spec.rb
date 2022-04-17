require 'rails_helper'

RSpec.describe "Users", type: :request do

  before do
    @user = FactoryBot.create(:user)
  end

  describe "GET /index" do

    it "returns http redirect with not login" do
      get users_path
      expect(response).to redirect_to(login_url) #ページがlogin_urlにリダイレクトする
    end

    it "returns http redirect with not admin" do
      @user.admin = false
      @user.save
      log_in_as @user
      get users_path
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
    end

    it "returns http success" do
      log_in_as @user
      get users_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /new" do
    it "returns http success" do
      get signup_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "Post /create" do
    it "returns http redirect" do
      post signup_path, params: { user: { name: "User4",
                                         email: "user4@example.com",
                                      password: "password",
                         password_confirmation: "password" } }
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
    end
  end

end
