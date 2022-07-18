class SearchsController < ApplicationController

  def search
    @users = User.search_user("name",search_params[:query])
    @kifus = Kifu.search_kifu_and_tag("CONCAT(player1 ,player2)",search_params[:query]).order(id: "desc").page(params[:page]).per(20)
    respond_to do |format|
      format.html { render "search"}
      format.json { render json: {  
                      users: @users.to_json(only: %i[ id name ]),
                      kifus: @kifus.to_json(only: %i[ id user_id title player1 player2 win created_at ]) }
                  }
    end
  end

  private

    def search_params
      params.permit(:query)
    end
end
