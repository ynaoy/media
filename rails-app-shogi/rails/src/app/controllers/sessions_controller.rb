class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session][:password])
      #sessionで管理する用。いずれ削除する
      log_in(@user) #sessionに@user.idを追加
      remember(@user) #cookieに@user.idを追加

      #user_idをjwtトークンにencodeしてjson形式で渡す
      payload = {user_id: @user.id }
      token = encode_token(payload)
      #redirect_to root_url
      respond_to do |format|
        format.html { redirect_to root_url }
        format.json { render json: { jwt: token, success: "Welcome back" } }
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

  def auto_login
    token = request.headers['Authorization']
    auth = session_user(token)
    if auth
      render json: auth
    else
      render json: {errors: "No user Logged In"}
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

end
