class CreateKifuTags < ActiveRecord::Migration[6.1]
  def change
    create_table :kifu_tags do |t|
      t.integer :tag_id, null: false
      t.references :kifu, null: false, foreign_key: true

      t.timestamps
    end
    add_index :kifu_tags, [:kifu_id, :tag_id]
  end
end
