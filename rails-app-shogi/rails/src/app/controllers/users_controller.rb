class UsersController < ApplicationController

  before_action :logged_in_user, only: %i[index edit update destroy history favorite]
  before_action :admin_user,     only: :index
  before_action :correct_user,   only: %i[history favorite]

  def index 
    @users = User.all.order(id: "desc") #<< Todo activatedカラムがtrueなユーザーだけ取り出す>>
    respond_to do |format|
      format.html { @users = @users.page(params[:page]).per(20)
                    render "index"}
      format.json { render json: @users.to_json(only: %i[ id name ])}
    end
  end

  def show
    # << TODO ユーザーが存在しなかったときの処理を追加する >>
    @user = User.find(params[:id])
    
    # << Todo Userモデルのactivatedカラムがfalseならエラーを吐き出す >>

    @kifus = Kifu.search_kifu(attribute = "user_id",str = params[:id]).order(id: "desc")
    respond_to do |format|
      format.html { @kifus = @kifus.page(params[:page]).per(20)
                    render "show"}
      format.json { render json:  
                      { user:  @user.to_json(only: %i[ id name ]),
                        kifus: @kifus.to_json(only: %i[ id user_id title player1 player2 win created_at ])}
                  }
    end
  end

  def new
    @user = User.new
  end

  def create
    if(params[:format]=="json")
      return if(!check_csrf_token)
      params[:user] = JSON.parse(params[:user],symbolize_names: true)
    end

    @user = User.new(user_params)
    if @user.save
      
    # ※login処理はメール送信後account_activationsコントローラーでやるのでいったんコメントアウト
      #sessionで管理する用。いずれ削除する
      #log_in(@user) #sessionに@user.idを追加
      #remember(@user) #cookieに@user.idを追加

      #user_idをjwtトークンにencodeしてcookieにセットする
      #jwt_token(@user)
      p @user.activation_token #一時的にデバック用

      respond_to do |format|
        format.html { redirect_to root_url }
        format.json { render json: { success: "Check your email address" } }
      end

    else
      respond_to do |format|
        format.html { render 'new' }
        format.json { render json: {errors: @user.errors.full_messages},status: :not_acceptable }
      end
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    if(params[:format]=="json")
      return if(!check_csrf_token)
      params[:user] = JSON.parse(params[:user],symbolize_names: true)
    end
    @user = User.find(params[:id])
    if @user.update(user_params)
      respond_to do |format|
        format.html do
          flash.now[:success] = "Profile updated"
          redirect_to @user
        end
        format.json { render json: { success: "Updated!!" } }
      end
    else
      respond_to do |format|
        format.html { render 'edit'}
        format.json { render json: {errors: @user.errors.full_messages},status: :not_acceptable }
      end
    end
  end

  def destroy
    # << Todo current_userかadmin_userのみが使えるようにする >>
    if(params[:format]=="json")
      return if(!check_csrf_token)
    end

    User.find(params[:id]).destroy
    respond_to do |format|
      format.html { flash.now[:success] = "User deleted"
                    redirect_back_or(root_url)}
      format.json { render json: { success: "delete User!!" } }
    end
  end

  def history
    @user = User.find(params[:id])
    @hist_and_kifus = History.hist_and_kifus(@user.id) if @user
    respond_to do |format|
      format.html { render "history"}
      format.json { render json: 
                    @hist_and_kifus.to_json(
                        only: %i[ id user_id title player1 player2 win created_at watch_at ] )
                  }
    end
  end

  def favorite
    @user = User.find(params[:id])
    if @user
      @favorite_kifus = Favorite.favorite_kifus(@user.id)
      respond_to do |format|
        format.html { @favorite_kifus = @favorite_kifus.page(params[:page]).per(20)
                      render "favorite"}
        format.json { render json:
                      @favorite_kifus.to_json(
                        only: %i[ id user_id title player1 player2 win created_at ] )
                    }    
      end  
    end
  end

  private

    def user_params
      params.require(:user).permit( :name, :email, :password,
                                    :password_confirmation)
    end
    # beforeアクション

    # 正しいユーザーかどうか確認
    def correct_user
      @user = User.find(params[:id])
      if((ENV["RAILS_ENV"]!="test")&&(params[:format]=="json"))
        token = request.cookies["jwt"]
        unless session_user?(token, @user)
          response_unauthorized
          return 
        end
      else
        redirect_to(root_url) unless current_user?(@user)
      end
    end

    # 管理者かどうか確認
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end

end
