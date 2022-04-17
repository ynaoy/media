class AddWinToKifu < ActiveRecord::Migration[6.1]
  def change
    add_column :kifus, :win, :integer
  end
end
