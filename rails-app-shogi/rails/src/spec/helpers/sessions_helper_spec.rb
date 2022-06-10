require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the KifusHelper. For example:
#
# describe KifusHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe SessionsHelper, type: :helper do

  describe "encode_token" do
    it "should work" do
      payload = {user_id: 0 }
      token = helper.encode_token(payload)
      expect(token.nil?).to eq false
      expect(token).not_to be payload
    end
  end

  describe "decoded_token" do
    it "should work" do
      payload = { user_id: 0 }
      token = helper.encode_token(payload)
      token = "a "+token+" b"
      decode_token = helper.decoded_token(token)
      expect(decode_token[0]['user_id']).to eq payload[:user_id]
    end
  end

  describe "session_user" do

    before do
      @user = FactoryBot.create(:user)
    end

    it "should work" do
      payload =  { user_id: @user.id }
      token = helper.encode_token(payload)
      token = "a "+token+" b"
      user = helper.session_user(token)
      expect(user.id).to be @user.id
    end
  end
  
end