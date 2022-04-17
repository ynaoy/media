class CreateKifus < ActiveRecord::Migration[6.1]
  def change
    create_table :kifus do |t|
      t.text :content
      t.string :player1
      t.string :player2
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :kifus, [:user_id, :created_at]
  end
end
