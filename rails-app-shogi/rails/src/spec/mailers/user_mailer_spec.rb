require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "account_activation" do
    let(:user) { FactoryBot.create(:user) }
    let(:mail) { UserMailer.account_activation(user) }

    it "renders the headers" do
      expect(mail.subject).to eq("Account activation")
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq([ENV['MAIL_USER_NAME']])
    end

    it "renders the body" do
      expect(mail.body.encoded).to have_content(user.activation_token)
    end
  end

end
