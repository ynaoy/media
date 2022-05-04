class KifuTag < ApplicationRecord
  belongs_to :kifu
  validates :kifu_id, presence: true
  validates :tag_id, presence: true
end
