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

  describe "GET /show" do
    it "returns http success" do
      get user_path(@user)
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

  describe "GET /edit" do

    it "returns http redirect with not login" do
      get edit_user_path(@user)
      expect(response).to redirect_to(login_url) #ページがlogin_urlにリダイレクトする
    end

    it "returns http success" do
      log_in_as @user
      get edit_user_path(@user)
      expect(response).to have_http_status(:success)
    end

  end

  describe "patch /update" do

    it "returns http redirect with not login" do
      patch user_path(@user) , params: { user: { name: "User4"}}
      expect(response).to redirect_to(login_url) #ページがlogin_urlにリダイレクトする
    end

    it "returns http redirect" do
      log_in_as @user
      patch user_path(@user) , params: { user: { name: "User4"}}
      expect(response).to redirect_to(user_path(@user)) #ページがusers/showにリダイレクトする
    end

  end

  describe "Delete /destroy" do
    it "returns http redirect" do
      delete user_path(@user)
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
    end
  end

  describe "GET /:id/history" do
    it "returns http redirect with not login" do
      get user_path(@user) + "/history"
      expect(response).to redirect_to(login_url) #ページがlogin_urlにリダイレクトする
    end

    it "returns http redirect" do
      log_in_as @user
      get user_path(@user) + "/history"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /:id/favorite" do
    it "returns http redirect with not login" do
      get user_path(@user) + "/favorite"
      expect(response).to redirect_to(login_url) #ページがlogin_urlにリダイレクトする
    end

    it "returns http redirect" do
      log_in_as @user
      get user_path(@user) + "/favorite"
      expect(response).to have_http_status(:success)
    end
  end

end
