class Favorite < ApplicationRecord
  
  belongs_to :user
  validates :user_id, presence: true
  validates :kifu_id, presence: true,
                      uniqueness: { scope: :user_id }
  default_scope -> { order(created_at: :desc) }

  def Favorite.favorite_kifus(user_id)

    select_columns = 
      "favorites.created_at AS watch_at, kifus.*"
    joins_sql = 
      "INNER JOIN kifus ON favorites.kifu_id = kifus.id"

    self.where("favorites.user_id=?",user_id).joins(joins_sql).select(select_columns)

  end

end
