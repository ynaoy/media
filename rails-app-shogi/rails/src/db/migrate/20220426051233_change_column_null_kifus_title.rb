class ChangeColumnNullKifusTitle < ActiveRecord::Migration[6.1]
  def change
    change_column_null :kifus, :title, false, ""
  end
end
