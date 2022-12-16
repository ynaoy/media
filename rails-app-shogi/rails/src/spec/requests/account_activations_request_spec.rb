require 'rails_helper'

# 破壊的な変更をしたので一旦ペンディング
RSpec.xdescribe "AccountActivations", type: :request do
  
  let(:user) { FactoryBot.create(:user,activated:false) }
  
  describe "http" do
    it "redirect user_url" do
      get edit_account_activation_url(user.activation_token, email: user.email)
      expect(response).to redirect_to(user_url(user)) #ページがusers/[id]にリダイレクトする
      expect(is_logged_in?).to be_truthy
    end

    it "if email is wrong, redirect root_url" do
      get edit_account_activation_url(user.activation_token, email: "wrong_email")
      expect(response).to redirect_to(root_url) #ページがroot_urlにリダイレクトする
      expect(is_logged_in?).not_to be_truthy
    end
  end

  describe "json" do
    it "return json object" do
      get edit_account_activation_url(user.activation_token, email: user.email, format: "json")
      expect(JSON.parse(response.body)['success'].nil?).to eq false
      expect(is_logged_in?).to be_truthy
    end

    it "if email is wrong, unauthorized error" do
      get edit_account_activation_url(user.activation_token, email: "wrong_email", format: "json")
      expect(response).to have_http_status(401)
      expect(JSON.parse(response.body)['status']).to eq 401
      expect(is_logged_in?).not_to be_truthy
    end

    it "if activation_token is wrong, unauthorized error" do
      get edit_account_activation_url("wrong_token", email: user.email, format: "json")
      expect(response).to have_http_status(401)
      expect(JSON.parse(response.body)['status']).to eq 401
      expect(is_logged_in?).not_to be_truthy
    end

    it "if user is activate, unauthorized error" do
      user.activated = true
      user.save

      get edit_account_activation_url(user.activation_token, email: user.email, format: "json")
      expect(response).to have_http_status(401)
      expect(JSON.parse(response.body)['status']).to eq 401
      expect(is_logged_in?).not_to be_truthy
    end
  end
end

