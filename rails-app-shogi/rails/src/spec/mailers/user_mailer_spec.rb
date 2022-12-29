require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "account_activation" do
    let(:user) { FactoryBot.create(:user) }
    let(:mail) { UserMailer.account_activation(user) }
    let(:mail_html_body) { mail.html_part.body.encoded }
    let(:mail_text_body) { mail.text_part.body.encoded }

    it "renders the headers" do
      expect(mail.subject).to have_content(user.activation_token)
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq([ENV['MAIL_USER_NAME']])
    end

    it "renders the html body" do
      expect(mail_html_body).to have_content("メールアドレスを確認してください")
      expect(mail_html_body).to have_content("将棋のお時間を使い始めるには、以下の認証コードを入力してください。")
      expect(mail_html_body).to have_content(user.activation_token)
    end

    it "renders the text body" do
      expect(mail_text_body).to have_content("メールアドレスを確認してください")
      expect(mail_text_body).to have_content("将棋のお時間を使い始めるには、以下の認証コードを入力してください。")
      expect(mail_text_body).to have_content(user.activation_token)
    end
  end

end
