require 'rails_helper'

RSpec.describe "PasswordResets", type: :request do

  let(:user) { FactoryBot.create(:user) }

  describe "POST /check_email" do
    describe "json" do
      it "return json object" do
        post "/password_resets/check_email",  params: { password_reset:{
                                                        email: user.email, 
                                                      }.to_json,
                                              format: "json"
        }
        expect(JSON.parse(response.body)['success'].nil?).to eq false
      end

      it "if user is not exist, unauthorized error" do
        post "/password_resets/check_email",  params: { password_reset:{
                                                        email:  nil, 
                                                      }.to_json,
                                              format: "json"
        }
        expect(response).to have_http_status(401)
        expect(JSON.parse(response.body)['status']).to eq 401
      end
    end
  end

  describe "POST /create" do

    describe "http" do
      it "returns http success" do
        post password_resets_path, params: {  password_reset:{
                                              email: user.email, 
                                            }
                                          }
        expect(response).to redirect_to(root_url)
      end

      it "if user is not exist, unauthorized error" do
        post password_resets_path,params: {  password_reset:{
                                              email: nil, 
                                            }
                                          }
        expect(response).to redirect_to(login_url)
      end
    end

    describe "json" do
      it "return json object" do
        post password_resets_path,  params: {  password_reset:{
                                                email: user.email, 
                                              }.to_json,
                                            format: "json"
        }
        expect(JSON.parse(response.body)['success'].nil?).to eq false
      end

      it "if user is not exist, unauthorized error" do
        post password_resets_path,  params: {  password_reset:{
                                                email:  nil, 
                                              }.to_json,
                                            format: "json"
        }
        expect(response).to have_http_status(401)
        expect(JSON.parse(response.body)['status']).to eq 401
      end
    end
  end

  describe "POST /check_token" do
    
    before do
      user.create_reset_digest
    end

    # before_actionのテストはupdate_passwordメソッドの方でやる
    describe "http" do
      it "returns http success" do
        post "/password_resets/check_token", params: {  password_reset:{ email: user.email, },
                                                        reset_token: user.reset_token
                                                      }
        expect(response).to redirect_to(root_url)
      end
    end

    describe "json" do
      it "return json object" do
        post "/password_resets/check_token",  params: { password_reset:{ email: user.email, }.to_json,
                                                        reset_token: user.reset_token,
                                                        format: "json"
                                                      }
        expect(JSON.parse(response.body)['success'].nil?).to eq false
      end
    end
  end

  describe "PATCH /update_password" do
    
    before do
      user.create_reset_digest
    end

    describe "http" do
      it "returns http success" do
        patch "/password_resets/update_password", params: { password_reset:{
                                                              email: user.email, 
                                                            },
                                                            user:{
                                                              password: "new_password",
                                                              password_confirmation: "new_password",
                                                            },
                                                            reset_token: user.reset_token
                                                          }
        expect(response).to redirect_to(user_url(user))
        expect(is_logged_in?).to be_truthy
      end

      it "if password is blank, unauthorized error" do
        patch "/password_resets/update_password", params: { password_reset:{
                                                              email: user.email, 
                                                            },
                                                            user:{
                                                              password: nil,
                                                              password_confirmation: nil,
                                                            },
                                                            reset_token: user.reset_token
                                                          }
        expect(response).to redirect_to(login_url)
      end
    end

    describe "json" do
      it "return json object" do
        patch "/password_resets/update_password",  params: {  password_reset:{
                                                                email: user.email, 
                                                              }.to_json,
                                                              user:{
                                                                password: "new_password",
                                                                password_confirmation: "new_password",
                                                              }.to_json,
                                                              reset_token: user.reset_token,
                                                              format: "json"
                                                            }
        expect(JSON.parse(response.body)['success'].nil?).to eq false
      end

      it "if user is not exist, unauthorized error" do
        patch "/password_resets/update_password",  params: {  password_reset:{
                                                                email: user.email, 
                                                              }.to_json,
                                                              user:{
                                                                password: nil,
                                                                password_confirmation: nil,
                                                              }.to_json,
                                                              reset_token: user.reset_token,
                                                              format: "json"
                                                            }
        expect(response).to have_http_status(401)
        expect(JSON.parse(response.body)['status']).to eq 401
      end

      it "if reset_sent_at exipired, unauthorized error" do
        user.reset_sent_at = 2.hours.ago
        user.save
        patch "/password_resets/update_password",  params: {  password_reset:{
                                                                email: user.email, 
                                                              }.to_json,
                                                              user:{
                                                                password: "new_password",
                                                                password_confirmation: "new_password",
                                                              }.to_json,
                                                              reset_token: user.reset_token,
                                                              format: "json"
                                                            }
        expect(response).to have_http_status(401)
        expect(JSON.parse(response.body)['status']).to eq 401
      end

      describe "valid_user" do
        it "if activated is false, unauthorized error" do
          user.activated = false
          user.save
          patch "/password_resets/update_password",  params: {  password_reset:{
                                                                  email: user.email, 
                                                                }.to_json,
                                                                user:{
                                                                  password: "new_password",
                                                                  password_confirmation: "new_password",
                                                                }.to_json,
                                                                reset_token: user.reset_token,
                                                                format: "json"
                                                              }
          expect(response).to have_http_status(401)
          expect(JSON.parse(response.body)['status']).to eq 401
        end

        it "if reset_token is wrong, unauthorized error" do
          patch "/password_resets/update_password",  params: {  password_reset:{
                                                                  email: user.email, 
                                                                }.to_json,
                                                                user:{
                                                                  password: "new_password",
                                                                  password_confirmation: "new_password",
                                                                }.to_json,
                                                                reset_token: nil,
                                                                format: "json"
                                                              }
          expect(response).to have_http_status(401)
          expect(JSON.parse(response.body)['status']).to eq 401
        end
      end

    end
  end

end
