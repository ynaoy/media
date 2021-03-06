class UsersController < ApplicationController

  before_action :logged_in_user, only: %i[index edit update history favorite]
  before_action :admin_user,     only: :index
  before_action :correct_user,   only: %i[history favorite]

  def index 
    @users = User.all.order(id: "desc").page(params[:page]).per(20)
  end

  def show
    @user = User.find(params[:id])
    @kifus = Kifu.search_kifu(attribute = "user_id",str = params[:id]).order(id: "desc").page(params[:page]).per(20)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user) #sessionに@user.idを追加
      remember(@user) #cookieに@user.idを追加
      redirect_to root_url
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      respond_to do |format|
        format.html do
          flash.now[:success] = "Profile updated"
          redirect_to @user
        end
        format.json { render json: @user, status: 200 }
      end
    else
      respond_to do |format|
        format.html { render 'edit'}
        format.json { render json: @user.errors, status: 400}
      end
    end
  end

  def destroy
    # << Todo current_userかadmin_userのみが使えるようにする >>
    User.find(params[:id]).destroy
    flash.now[:success] = "User deleted"
    redirect_back_or(root_url)
  end

  def history
    @user = User.find(params[:id])
    @hist_and_kifus = History.hist_and_kifus(@user.id) if @user
  end

  def favorite
    @user = User.find(params[:id])
    @favorite_kifus = Favorite.favorite_kifus(@user.id).page(params[:page]).per(20) if @user
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
    end
    # beforeアクション

    # 正しいユーザーかどうか確認
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end

    # 管理者かどうか確認
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end

end
