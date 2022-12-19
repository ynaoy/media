require 'rails_helper'

# 破壊的な変更をしたので一旦ペンディング
RSpec.describe "AccountActivations", type: :request do

  let(:user) { FactoryBot.create(:user, activated:false, activated_at:nil) }

  describe "http" do

    it "redirect user_url" do
      post account_activations_path, params: { account_activation:{
                                                  email: user.email, 
                                                  activation_token: user.activation_token 
                                                }
                                              }
      expect(response).to redirect_to(user_url(user)) #ページがusers/[id]にリダイレクトする
      expect(is_logged_in?).to be_truthy
    end

    it "if id is nil, redirect root_url" do
      post account_activations_url, params: { account_activation:{
                                                email: nil, 
                                                activation_token: user.activation_token
                                              }
                                            }
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
      expect(is_logged_in?).not_to be_truthy
    end
  end

  describe "json" do
    it "return json object" do
      post account_activations_url, params: { account_activation:{
                                                email: user.email, 
                                                activation_token: user.activation_token
                                              }.to_json,
                                              format: "json" }
      expect(JSON.parse(response.body)['success'].nil?).to eq false
      expect(is_logged_in?).to be_truthy
    end

    it "if id is wrong, unauthorized error" do
      post account_activations_url, params: { account_activation:{
                                                email:nil,
                                                activation_token: user.activation_token
                                              }.to_json,
                                              format: "json" }
      expect(response).to have_http_status(401)
      expect(JSON.parse(response.body)['status']).to eq 401
      expect(is_logged_in?).not_to be_truthy
    end

    it "if activation_token is wrong, unauthorized error" do
      post account_activations_url, params: { account_activation:{ 
                                                email: user.email, 
                                                activation_token: "wrong_token"
                                              }.to_json,
                                              format: "json" }
      expect(response).to have_http_status(401)
      expect(JSON.parse(response.body)['status']).to eq 401
      expect(is_logged_in?).not_to be_truthy
    end

    it "if user is activate, unauthorized error" do
      user.activated = true
      user.save

      post account_activations_url, params: { account_activation:{
                                                email: user.email, 
                                                activation_token: user.activation_token
                                              }.to_json,
                                              format: "json" }
      expect(response).to have_http_status(401)
      expect(JSON.parse(response.body)['status']).to eq 401
      expect(is_logged_in?).not_to be_truthy
    end
  end
end

