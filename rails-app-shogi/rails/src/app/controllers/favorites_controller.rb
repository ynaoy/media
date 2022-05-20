class FavoritesController < ApplicationController
  before_action :logged_in_user, only: %i[create destroy]
  before_action :correct_user,   only: :destroy

  def create
    @kifu = Kifu.find_by(id: favorites_params[:kifu_id] )
    @favorite = current_user.favorites.build(kifu_id: @kifu.id )

    if @favorite
      @favorite.save
      respond_to do |format|
        format.html { kifu_path(@kifu) }
        format.js
      end
    end
  end

  def destroy
    @kifu = Kifu.find_by(id: favorites_params[:kifu_id] )
    @favorite = current_user.favorites.find_by(kifu_id: @kifu.id).destroy

    if @favorite
      @favorite.save
      respond_to do |format|
        format.html { kifu_path(@kifu) }
        format.js
      end
    end
  end

  private

    def favorites_params
      params.require(:favorite).permit(:kifu_id )
    end

    def correct_user
      @favorite = current_user.favorites.find_by(kifu_id: favorites_params[:kifu_id])
      redirect_to root_url if @favorite.nil?
    end

end
