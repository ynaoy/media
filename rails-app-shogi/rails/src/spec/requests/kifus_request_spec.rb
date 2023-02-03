require 'rails_helper'

RSpec.describe "Kifus", type: :request do

  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu, user_id: @user.id)
    @tag = FactoryBot.create(:tag, name: "相掛かり")
    @kifu_tag = @kifu.kifu_tags.build(tag_id: @tag.id)
    @kifu_tag.save
  end

  describe "GET /new" do
    it "returns http success" do
      log_in_as @user
      get new_kifu_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    content ="棋戦：
              戦型：
              開始日時：
              終了日時：
              手合割：平手
              先手：player1
              後手：player2
              手数----指手---------消費時間--
              1 ７六歩(77)        ( 0:01/00:00:01)
              2 ８四歩(83)        ( 0:02/00:00:02)
              3 ２六歩(27)        ( 0:01/00:00:02)"
    before do
      log_in_as @user
    end

    it "returns http success" do
      post kifus_path, params: { kifu: {  title:"",
                                          player1:"",
                                          player2:"",
                                          content: content,
                                          kento: false,
                                          tag:{ tag_ids:[0,1,2] } } 
                                        }
      expect(response).to redirect_to( kifu_url(id:@kifu.id+1) ) #ページがShowにリダイレクトする
    end

    it "return json object" do
      #ネストした部分がjson形式で送られてくるので注意
      post kifus_path, params: {  kifu: ({  title:"",
                                            player1:"",
                                            player2:"",
                                            content: content, 
                                            kento: false,
                                            tag: { tag_ids:[0,1,2] },
                                          }).to_json,
                                  format: "json"}
      expect(JSON.parse(response.body)['success'].nil?).to eq false
    end

    it "return json object kifu errors" do
      #ネストした部分がjson形式で送られてくるので注意
      post kifus_path, params: {  kifu: ({  title:"",
                                            player1:"",
                                            player2:"",
                                            content: "", 
                                            kento: false,
                                            tag: { tag_ids:[0,1,2] }
                                          }).to_json,
                                    format: "json"}
      expect(JSON.parse(response.body)['errors'].nil?).to eq false
    end

    it "return json object tag errors" do
      #ネストした部分がjson形式で送られてくるので注意
      post kifus_path, params: {  kifu: ({  title:"",
                                            player1:"",
                                            player2:"",
                                            content: content, 
                                            kento: false,
                                            tag: { tag_ids:["errors"] }
                                          }).to_json,
                                    format: "json"}
      expect(JSON.parse(response.body)['errors'].nil?).to eq false
    end



  end

  describe "GET /show" do

    it "returns http success" do
      get kifu_path(@kifu)
      expect(response).to have_http_status(:success)
    end

    it "return json object" do
      get kifu_path(@kifu), params: { format: "json" }
      expect(JSON.parse(response.body)['kifu_text'].nil?).to eq false
    end

    it "kento is nil" do
      kifu = FactoryBot.create(:kifu, user_id: @user.id, kento: nil )
      get kifu_path(kifu), params: { format: "json" }
      expect(JSON.parse(response.body)['kento'].nil?).to be true
    end

    it "kento is processing_now" do
      kifu = FactoryBot.create(:kifu, user_id: @user.id, kento: "processing_now")
      get kifu_path(kifu), params: { format: "json" }
      expect(JSON.parse(response.body)['kento']).to eq "processing_now"
    end

    it "kento is not processing_now" do
      kifu = FactoryBot.create(:kifu, 
                                user_id: @user.id, 
                                kento: {"0"=> {"cp"=>"0" ,"pv"=>"2726 3334"}}.to_json )
      get kifu_path(kifu), params: { format: "json" }
      expect(JSON.parse(response.body)['kento'].nil?).to be false
      expect(JSON.parse(response.body)['kento']).not_to eq "processing_now"
    end
  end

  describe "GET /index" do
    it "returns http success" do
      log_in_as @user
      get kifus_path
      expect(response).to have_http_status(:success)
    end

    it "return json object" do
      log_in_as @user
      get kifus_path, params: { format: "json" }
      expect(JSON.parse(response.body).nil?).to eq false
    end
  end

  describe "Delete /destroy" do
    it "returns http redirect" do
      log_in_as @user
      delete kifu_path(@kifu)
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
    end

    it "return json object" do
      log_in_as @user
      delete kifu_path(@kifu), params: { format: "json" }
      expect(JSON.parse(response.body)['success'].nil?).to eq false
    end
  end

  describe "GET /random" do

    it "return json object with tag" do
      get "/kifus/random", params: { format: "json", kifu:{ tag: "相掛かり"} }
      expect(JSON.parse(response.body)['kifu_text'].nil?).to eq false
    end

    it "return json object with not exist tag" do
      get "/kifus/random", params: { format: "json", kifu:{ tag: "not exist tag"} }
      expect(JSON.parse(response.body).nil?).to eq false
    end

    it "return json object when params is empty" do
      get "/kifus/random", params: { format: "json", kifu:{ tag: ""} }
      expect(JSON.parse(response.body)['kifu_text'].nil?).to eq false
    end

    it "return json object when params is nil" do
      get "/kifus/random", params: { format: "json", kifu:{ tag: nil} }
      expect(JSON.parse(response.body)['kifu_text'].nil?).to eq false
    end
  end

  describe "GET /get_kifus" do

    it "return json object  with tag" do
      get "/kifus/get_kifus", params: { format: "json", kifu:{ tag: "相掛かり"} }
      expect(JSON.parse(response.body)[0].nil?).to eq false
    end

    it "return json object with not exist tag" do
      get "/kifus/get_kifus", params: { format: "json", kifu:{ tag: "not exist tag"} }
      expect(JSON.parse(response.body)[0].nil?).to eq true
    end

    it "return json object when params is empty" do
      get "/kifus/get_kifus", params: { format: "json", kifu:{ tag: ""} }
      expect(JSON.parse(response.body)[0].nil?).to eq false
    end

    it "return json object when params is nil" do
      get "/kifus/get_kifus", params: { format: "json", kifu:{ tag: nil} }
      expect(JSON.parse(response.body)[0].nil?).to eq false
    end
  end
end
