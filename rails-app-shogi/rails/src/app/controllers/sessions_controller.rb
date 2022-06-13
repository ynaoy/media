class SessionsController < ApplicationController
  before_action :set_csrf_token,     only: :login_check

  def new
  end

  def create
    if(params[:format]=="json")
      return if(!check_csrf_token)
      params[:session] = JSON.parse(params[:session],symbolize_names: true)
    end

    @user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session][:password])
      #sessionで管理する用。いずれ削除する
      log_in(@user) #sessionに@user.idを追加
      remember(@user) #cookieに@user.idを追加

      #user_idをjwtトークンにencodeしてcookieにjwtトークンをセットする
      jwt_token(@user)

      respond_to do |format|
        format.html { redirect_to root_url }
        format.json { render json: { success: "Welcome back" } }
      end

    else
      flash.now[:danger] = 'メールアドレス、又はパスワードに誤りがあります'
      #render 'new'
      respond_to do |format|
        format.html { render 'new' }
        format.json { response_unauthorized }
      end
    end
  end

  def login_check
    token = request.cookies["jwt"]
    auth = session_user(token)
    set_csrf_token
    render json: auth
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

end
