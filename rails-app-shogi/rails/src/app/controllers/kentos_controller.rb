class KentosController < ApplicationController
  before_action :check_json_request, only: :create
  before_action :correct_user , only: :create

  def create
    @kifu = Kifu.find(kento_params[:id])
    if(@kifu)
      if(@kifu.kento.nil?)
        # Jobを実行してバックグラウンドで別APIと通信する
        SocketSubApi1Job.perform_later(@kifu)
        @kifu.update({kento: "processing_now"})
        respond_to do |format|
          format.html { redirect_to kifu_path(id:@kifu.id) }
          format.json { render json: { kento: "processing_now"} }
        end
      else
        errors = (@kifu.kento == "processing_now")? @kifu.kento : "already_processed"
        respond_to do |format|
          format.html { redirect_to kifu_path(id:@kifu.id) }
          format.json { render json: { errors: errors}, status:500 }
        end
      end
    end
  end

  def show
    @kifu = Kifu.find(params[:id])
    if(@kifu)
      kifu_list = @kifu.extract_kifu
      @kifu_text, @kifu_flg = kifu_to_board(kifu_list)

      # @kento = "processing_now" or nil or @kifu.kentoが棋譜形式に変換されたもの
      @kento = if (@kifu.kento.nil?)
        nil 
      else 
        if (@kifu.kento =="processing_now") 
          "processing_now"
        else 
          convert_usi_to_kifu(@kifu_text.deep_dup, JSON.parse(@kifu.kento))
        end
      end
      
      respond_to do |format|
        # @kifu.kentoがnilだとしても、フロント側でnull用の処理があるのでOK
        format.json { render json: { kento: @kento } }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: "not found kifu"}, status:404 }
      end
    end
  end

  private

    def kento_params
      params.require(:kento).permit(:id)
    end

    def correct_user
      if((ENV["RAILS_ENV"]!="test")&&(params[:format]=="json"))
        @kifu = session_user(request.cookies["jwt"]).kifus.find_by(id: kento_params[:id])
        if @kifu.nil?
          response_unauthorized
          return 
        end
      else
        @kifu = current_user.kifus.find_by(id: kento_params[:id])
        redirect_to root_url if @kifu.nil?
      end
    end

    def check_json_request
      if(params[:format]=="json")
        return if(!check_csrf_token)
        params[:kento] = JSON.parse(params[:kento],symbolize_names: true)
      end
    end
end
