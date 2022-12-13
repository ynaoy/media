class AccountActivationsController < ApplicationController

  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
      user.activate

      #sessionで管理する用。いずれ削除する
      log_in(user) #sessionに@user.idを追加
      remember(user) #cookieに@user.idを追加

      #user_idをjwtトークンにencodeしてcookieにjwtトークンをセットする
      jwt_token(user)

      respond_to do |format|
        format.html { redirect_to(user) }
        format.json { render json: { success: "Welcome!!" } }
      end

    else
      respond_to do |format|
        format.html { redirect_to(root_url) }
        format.json { response_unauthorized }
      end

    end
  end

end
