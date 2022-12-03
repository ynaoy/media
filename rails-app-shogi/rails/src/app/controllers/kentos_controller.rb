class KentosController < ApplicationController
  before_action :check_json_request
  before_action :correct_user

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
