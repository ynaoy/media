class SessionsController < ApplicationController
  def new
  end

  def create
    email,password = login_params(params)
    @user = User.find_by(email: email.downcase)
    if @user && @user.authenticate(password)
      #sessionで管理する用。いずれ削除する
      log_in(@user) #sessionに@user.idを追加
      remember(@user) #cookieに@user.idを追加
      #user_idをjwtトークンにencodeしてjson形式で渡す
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
    p request.cookies["jwt"]
    token = request.cookies["jwt"]
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
