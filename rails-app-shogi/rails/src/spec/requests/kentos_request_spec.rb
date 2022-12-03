require 'rails_helper'

RSpec.describe "Kentos", type: :request do

  before do
    @user = FactoryBot.create(:user)
    @kifu = FactoryBot.create(:kifu, user_id: @user.id)
  end

  describe "POST /create" do

    before do
      log_in_as @user
    end

    it "returns http success" do
      post kentos_path, params: { kento: {id: @kifu.id} }
      expect(response).to redirect_to( kifu_url(id:@kifu.id))  #ページがShowにリダイレクトする
    end

    it "return json object" do
      post kentos_path, params: { format: "json", kento: ({id: @kifu.id}).to_json }
      expect(JSON.parse(response.body)['kento'].nil?).to eq false
    end

    it "return errors object processing_now" do
      @kifu.kento = "processing_now"
      @kifu.save
      post kentos_path, params: { format: "json", kento: ({id: @kifu.id}).to_json }
      expect(JSON.parse(response.body)['errors']=="processing_now").to eq true
    end

    it "return errors object already_processed" do
      @kifu.kento = "already"
      @kifu.save
      post kentos_path, params: { format: "json", kento: ({id: @kifu.id}).to_json }
      expect(JSON.parse(response.body)['errors']=="already_processed").to eq true
    end
  end

end
