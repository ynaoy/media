class SearchsController < ApplicationController

  def search
    @users = User.search_user("name",search_params[:query])[0..5]
    @kifus = Kifu.search_kifu_and_tag("player1 OR player2",search_params[:query]).order(id: "desc").page(params[:page]).per(20)
  end

  private

    def search_params
      params.permit(:query)
    end
end
