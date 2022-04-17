class Kifu < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :content, presence: true
  validates :player1, length: { maximum: 10 }
  validates :player2, length: { maximum: 10 }
  default_scope -> { order(created_at: :desc) }
  REGEX = /[[１-９]|同][[^[)|打]]]*[)|打]/

  #:contentからviewに渡す情報を取り出す
  def extract_kifu
    self.content.scan(REGEX)
  end

  #kifuモデルからattributeをstrで検索する
  def Kifu.search_kifu(attribute = nil,str = nil)
    if attribute && str
      if attribute!="user_id"
        str = "%"+str+"%"
      end
      Kifu.where("#{attribute} LIKE ?",str)
    end
  end

end
