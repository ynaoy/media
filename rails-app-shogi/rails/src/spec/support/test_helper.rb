module TestHelper

  # テストユーザーがログイン中の場合にtrueを返す
  def is_logged_in?
    !session[:user_id].nil?
  end

  # テストユーザーとしてログインする
  def log_in_as(user)
    post login_path, params: { session: { email: user.email,
                                         password: "password" } }

  end

  # E2Eでテストユーザーとしてログインする
  def log_in_e2e(user)
    visit login_path
    fill_in "メールアドレス", with: user.email
    fill_in "パスワード", with: "password"
    click_on "ログインする"

  end

end