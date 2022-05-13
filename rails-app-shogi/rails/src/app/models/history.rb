class History < ApplicationRecord

  belongs_to :user
  validates :user_id,  presence: true
  validates :kifu_id,  presence: true
  default_scope -> { order(created_at: :desc) }

  def History.hist_and_kifus(user_id)

    select_columns = 
      "histories.created_at AS watch_at, kifus.*"
    joins_sql = 
      "INNER JOIN kifus ON histories.kifu_id = kifus.id"

    self.where("histories.user_id=?",user_id).joins(joins_sql).select(select_columns)

  end
end
