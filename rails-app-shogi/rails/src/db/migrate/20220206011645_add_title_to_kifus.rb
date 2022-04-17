class AddTitleToKifus < ActiveRecord::Migration[6.1]
  def change
    add_column :kifus, :title, :text
  end
end
