module SessionsHelper

  # userをsessionに追加する
  def log_in(user)
    session[:user_id] = user.id
  end

  # userをcookieに追加する
  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # userがsessionかcookieに入っていればtrueを返す
  def current_user?(user)
    user == current_user
  end

  # sessionかcookieに入っているuser_idからuserを探して返す
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(:remember, cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  # ユーザーがログインしていればtrue、その他ならfalseを返す
  def logged_in?
    !current_user.nil?
  end

  # cookieを破棄する
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  # sessionを破棄する
  def log_out
    forget(current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  # 記憶したURL (もしくはデフォルト値) にリダイレクト
  def redirect_back_or(default)
    session[:forwarding_url]? redirect_to(session[:forwarding_url]) : redirect_to(cookies[:forwarding_url] || default) 
    session.delete(:forwarding_url)
    cookies.delete(:forwarding_url)
  end

  # アクセスしようとしたURLを覚えておく
  def store_location
    session[:forwarding_url] = request.original_url if request.get?
  end

  #---------------------------------------------------
  # ここからRailsApi+NuxtSpaで認証で、jwtトークンをLocalStrageに保存する場合
  #---------------------------------------------------

  # 認証が通らなかったときに"401 Unauthorized"が入ったjsonオブジェクトを返す
  def response_unauthorized
    render status: 401, json: { status: 401, message: 'Unauthorized' }
  end
  
  # payloadをjwtトークンにエンコードする
  def encode_token(payload)
    JWT.encode(payload,'my_secret_key','HS256')
  end

  # リクエストのヘッダにdecode_tokenが存在するならUserModelを返し、存在しなければnilを返す
  def session_user(token)
    decoded_hash = decoded_token(token)
    if !decoded_hash.empty?
        user_id = decoded_hash[0]['user_id']
        @user = User.find_by(id: user_id)
    else 
        nil
    end
  end

  def auth_header
    request.headers['Authorization']
  end 

  #リクエストのヘッダに'Authorization'が含まれているならjwtトークンをデコードして返す
  #含まれていなければ空のlistを返す
  def decoded_token(token)
    if token
      token = token.split(' ')[1]
      begin
        JWT.decode(token, 'my_secret_key', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        []
      end
    end
  end
end
