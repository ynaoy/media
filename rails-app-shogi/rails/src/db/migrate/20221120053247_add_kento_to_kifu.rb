class AddKentoToKifu < ActiveRecord::Migration[6.1]
  def change
    add_column :kifus, :kento, :text
  end
end
