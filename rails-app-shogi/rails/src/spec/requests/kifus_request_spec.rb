require 'rails_helper'

RSpec.describe "Kifus", type: :request do

  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu, user_id: @user.id)
  end

  describe "GET /new" do
    it "returns http success" do
      log_in_as @user
      get "/kifus/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "Get /create" do
    it "returns http success" do
      log_in_as @user
      get "/kifus/create", params: { kifu: { title:"",
                                             player1:"",
                                             player2:"",
                                             content:
               "棋戦：
                戦型：
                開始日時：
                終了日時：
                手合割：平手
                先手：player1
                後手：player2
                手数----指手---------消費時間--
                 1 ７六歩(77)        ( 0:01/00:00:01)
                 2 ８四歩(83)        ( 0:02/00:00:02)
                 3 ２六歩(27)        ( 0:01/00:00:02)
                ",
                tag:{ tag_ids:[0,1,2] } } }
      expect(response).to redirect_to( kifu_url(id:@kifu.id+1) ) #ページがShowにリダイレクトする
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/kifus/show", params: { id: @kifu.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /index" do
    it "returns http success" do
      log_in_as @user
      get "/kifus"
      expect(response).to have_http_status(:success)
    end
  end

  describe "Delete /destroy" do
    it "returns http redirect" do
      log_in_as @user
      delete kifu_path(@kifu)
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
    end
  end

end
