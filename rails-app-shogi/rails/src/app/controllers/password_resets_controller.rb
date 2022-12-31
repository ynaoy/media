class PasswordResetsController < ApplicationController
  before_action :check_json_request 
  before_action :get_user
  before_action :parse_user_params, only: [:update]
  before_action :valid_user, only: [:update]
  before_action :check_expiration, only: [:update]

  def check_email
    if @user
      respond_to do |format|
        format.json { render json: { success: "user is exist" } }
      end

    else
      respond_to do |format|
        format.json { response_unauthorized }
      end
    end
  end

  def create
    if @user
      @user.create_reset_digest
      #@user.send_password_reset_email

      respond_to do |format|
        format.html { redirect_to root_url }
        format.json { render json: { success: "email sent with password reset" } }
      end

    else
      render_errors
    end
  end

  def update
    if params[:user][:password].nil?
      #リクエストのパラメータにpasswordがない場合
      render_errors

    elsif @user.update(user_params)
      #sessionで管理する用。いずれ削除する(ログイン処理)
      log_in(@user) #sessionに@user.idを追加
      remember(@user) #cookieに@user.idを追加

      #user_idをjwtトークンにencodeしてcookieにjwtトークンをセットする(ログイン処理)
      jwt_token(@user)

      #パスワード更新用に使ったダイジェストを削除
      @user.update_attribute(:reset_digest, nil)

      respond_to do |format|
        format.html { redirect_to @user }
        format.json { render json: { success: "update your password" } }
      end

    else
      render_errors
    end
  end

  private

    def user_params
      params.require(:user).permit(:password, :password_confirmation)
    end

    # ユーザーが存在しないかパラメータが不正の時のレスポンス
    def render_errors
      respond_to do |format|
        format.html { redirect_to login_url }
        format.json { response_unauthorized }
      end
    end

    def get_user
      if(params[:password_reset][:email])
        @user = User.find_by(email: params[:password_reset][:email].downcase) 
      end
    end

    # 正しいユーザーかどうか確認する
    def valid_user
      unless (@user && @user.activated? &&
              @user.authenticated?(:reset, params[:reset_token]))
        respond_to do |format|
          format.html { redirect_to login_url }
          format.json { response_unauthorized }
        end
      end
    end

    # トークンが期限切れかどうか確認する
    def check_expiration
      if @user.expired?(:reset_sent)
        respond_to do |format|
          format.html { redirect_to login_url }
          format.json { response_unauthorized }
        end
      end
    end

    def check_json_request
      if(params[:format]=="json")
        return if(!check_csrf_token)
        params[:password_reset] = JSON.parse(params[:password_reset],symbolize_names: true)
      end
    end

    def parse_user_params
      if(params[:format]=="json")
        params[:user] = JSON.parse(params[:user],symbolize_names: true)
      end
    end

end
