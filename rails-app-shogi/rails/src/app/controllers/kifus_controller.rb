class KifusController < ApplicationController
  before_action :logged_in_user, only: %i[new create destroy index]
  before_action :correct_user,   only: :destroy

  def new
    @kifu = Kifu.new
  end

  def create
    params[:kifu] = get_data_from_content(params[:kifu])
    @kifu = current_user.kifus.build(kifus_params)
    if @kifu.save
      flash[:success] = "Kifu created!"
      redirect_to kifu_path(id:@kifu.id)
    end
  end

  def show
    kifus = Kifu.find(params[:id])

    @player1 = kifus.player1
    @player2 = kifus.player2

    kifus = kifus.extract_kifu
    @kifus_text, @kifus_flg = kifu_to_board(kifus)
  end

  def index
    @kifus = Kifu.search_kifu("user_id",current_user.id).order(id: "desc").page(params[:page]).per(20)
  end

  def destroy
    Kifu.find(params[:id]).destroy
    flash[:success] = "Kifu deleted"
    redirect_back_or(root_url)
  end

  private

    def kifus_params
      params.require(:kifu).permit(:title, :player1, :player2, :content, :win )
    end

    def correct_user
      @kifus = current_user.kifus.find_by(id: params[:id])
      redirect_to root_url if @kifus.nil?
    end
end
