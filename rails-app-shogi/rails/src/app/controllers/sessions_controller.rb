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

      #<<TODO Userモデルにactivatedカラム(bool値)を追加したのでそれによって処理を分岐させる >>

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
    @user = session_user(token)
    auth =  if(@user.nil?)
              { user_id:nil, user_name:nil, errors: "No user Logged In" }
            else
              { user_id: @user.id, user_name: @user.name, admin: @user.admin }
            end
    set_csrf_token
    render json: auth
  end

  def destroy
    if(params[:format]=="json")
      return if(!check_csrf_token)
      cookies.delete(:jwt)
    end
    log_out if logged_in?

    respond_to do |format|
      format.html { redirect_to root_url }
      format.json { render json: { success: "bye" } }
    end
  end

end
