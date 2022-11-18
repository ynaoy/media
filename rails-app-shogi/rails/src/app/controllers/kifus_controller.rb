class KifusController < ApplicationController
  before_action :logged_in_user, only: %i[new create destroy index]
  before_action :correct_user,   only: :destroy

  def new
    @kifu = Kifu.new
    @tag = Tag.new
  end

  def create
    if(params[:format]=="json")
      return if(!check_csrf_token)
      params[:kifu] = JSON.parse(params[:kifu],symbolize_names: true)
    end

    params[:kifu] = fetch_data_from_content(params[:kifu])
    @kifu = current_user.kifus.build(kifus_params)

    if @kifu.save

      @tag = @kifu.save_kifu_tag(tags_params[:tag][:tag_ids])
      if @tag
        respond_to do |format|
          format.html { flash.now[:success] = "Kifu created!"
                        redirect_to kifu_path(id:@kifu.id) }
          format.json { render json: { success: "create kifu!!", kifu_id: @kifu.id } }
        end

      #タグがエラーだった場合
      else
        respond_to do |format|
          format.html { render new }
          format.json { render json: { errors: "tag error"}, status:500 }
        end
      end
      
      # Jobを実行してバックグラウンドで別APIと通信する
      # SocketSubApi1Job.perform_later(kifus_params)

    #棋譜がエラーだった場合
    else
      respond_to do |format|
        format.html { render new }
        format.json { render json: { errors: @kifu.errors.full_messages}, status:500 }
      end
    end 
  end

  def show
    # << TODO 棋譜が存在しなかったときの処理を追加する >>
    @kifu = Kifu.find(params[:id])
    @tags = @kifu.get_tags 

    kifu_list = @kifu.extract_kifu
    @kifu_text, @kifu_flg = kifu_to_board(kifu_list)

    if logged_in?
      current_user.histories.create!(kifu_id: @kifu.id)
      @favorite_flg = current_user.is_favorite_kifu?(kifu_id = @kifu.id)
    end

    response_json = { kifu_text: @kifu_text, kifu_flg: @kifu_flg,
                      favorite_flg: @favorite_flg, kifu_id: @kifu.id,
                      player1: @kifu.player1, player2: @kifu.player2, tags: @tags.to_json(only:[:name]) }

    respond_to do |format|
      format.html { render "show"}
      format.json { render json: response_json }
    end
  end

  def index
    user_id = if(params[:format]=="json" && !Rails.env.test?)
      session_user(request.cookies["jwt"]).id
    else
      current_user.id
    end
    
    @kifus = Kifu.search_kifu("user_id",user_id).order(id: "desc")
    respond_to do |format|
      format.html { @kifus = @kifus.page(params[:page]).per(20)
                    render "index"}
      format.json { render json: @kifus.to_json(only: %i[ id user_id title player1 player2 win created_at ])}
    end
  end

  def destroy
    if(params[:format]=="json")
      return if(!check_csrf_token)
    end
    Kifu.find(params[:id]).destroy
    respond_to do |format|
      format.html { flash.now[:success] = "Kifu deleted"
                    redirect_back_or(root_url)}
      format.json { render json: { success: "delete kifu!!" } }
    end
  end

  private

    def kifus_params
      params.require(:kifu).permit(:title, :player1, :player2, :content, :win )
    end

    def tags_params
      params.require(:kifu).permit(tag: [tag_ids:[] ])
    end

    def correct_user
      if((ENV["RAILS_ENV"]!="test")&&(params[:format]=="json"))
        @kifus = session_user(request.cookies["jwt"]).kifus.find_by(id: params[:id])
        if @kifus.nil?
          response_unauthorized
          return 
        end
      else
        @kifus = current_user.kifus.find_by(id: params[:id])
        redirect_to root_url if @kifus.nil?
      end
    end
end
