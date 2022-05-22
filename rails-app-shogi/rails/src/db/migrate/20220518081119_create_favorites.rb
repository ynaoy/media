class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.integer :kifu_id, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
