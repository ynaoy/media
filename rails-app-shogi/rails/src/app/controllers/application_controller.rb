class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception
  include SessionsHelper
  include KifusHelper

  def home
  end

  private
    # セッションとレスポンスのヘッダにcsrf_tokenをセットする
    # 以降リクエストのAuthorizationヘッダとセッションのtokenで認証する
    def set_csrf_token
      session[:csrf_token] ||= SecureRandom.base64(8)
      response.set_header('csrf_token', session[:csrf_token])
    end

    # Postリクエスト時に、Authorizationヘッダとセッションのcsrf_tokenで認証する
    # 認証失敗ならAuthorizationエラーと返す
    def check_csrf_token
      if(session[:csrf_token] != request.headers["Authorization"])
        render status: 401, json: { status: 401, message: "Can't verify CSRF token authenticity." }
        return false
      end
      true
    end

    # ユーザーのログインを確認する
    def logged_in_user
      unless logged_in?
        store_location
        flash[:danger] = "Please log in."
        redirect_to login_url
      end
    end
end
