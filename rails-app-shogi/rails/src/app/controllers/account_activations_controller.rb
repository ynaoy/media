class AccountActivationsController < ApplicationController
  before_action :check_json_request, only: :create

  def create
    user = User.find_by(email: account_activations_params[:email])
    if user && !user.activated? && !user.expired?(:created) && user.correct_token?( :activation,
                                                                account_activations_params[:activation_token])

      user.activate

      #sessionで管理する用。いずれ削除する(ログイン処理)
      log_in(user) #sessionに@user.idを追加
      remember(user) #cookieに@user.idを追加

      #user_idをjwtトークンにencodeしてcookieにjwtトークンをセットする(ログイン処理)
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

  private

    def account_activations_params
      params.require(:account_activation).permit(:email, :activation_token)
    end

    def check_json_request
      if(params[:format]=="json")
        return if(!check_csrf_token)
        params[:account_activation] = JSON.parse(params[:account_activation],symbolize_names: true)
      end
    end

end
