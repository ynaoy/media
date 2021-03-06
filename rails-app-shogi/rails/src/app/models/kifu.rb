class Kifu < ApplicationRecord
  belongs_to :user
  has_many :kifu_tags, dependent: :destroy
  validates :user_id, presence: true
  validates :content, presence: true
  validates :player1, length: { maximum: 10 }
  validates :player2, length: { maximum: 10 }
  default_scope -> { order(created_at: :desc) }
  REGEX = /[[１-９]|同][[^[)|打]]]*[)|打]/  #1～9か同から始まって、[)と打]を含まない文字が続き、[)と打]

  #list形式のデータをkifu_tagにsaveする
  def save_kifu_tag(list)
    for id in 0..(list.length-1) do
      next if list[id] == ""
      @tag = self.kifu_tags.build(tag_id: list[id])
      @tag.save
      return false if(!@tag)
      render new if !@tag
    end
  end

  #kifu_tags.tag_idとtags.idを照会してINNER JOINする
  def get_tags
    self.kifu_tags.joins("INNER JOIN tags ON tags.id = kifu_tags.tag_id").select("kifu_tags.*","tags.name")
  end

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

  #kifuモデルからattributeをstrで検索する
  #OR tagモデルのnameカラムをstrで検索して、一致するkifuモデルのレコードを返す
  def Kifu.search_kifu_and_tag(attribute = nil,str = nil)
    if attribute && str
      if attribute!="user_id"
        str = "%"+str+"%"
      end
      kifu_ids = "SELECT kifu_id FROM kifu_tags"
      tag_ids =  "SELECT id FROM tags WHERE (name LIKE :str)"
      Kifu.where("#{attribute} LIKE :str OR id IN ( #{kifu_ids} WHERE tag_id IN (#{tag_ids}) )",str: str)
    end
  end

end
