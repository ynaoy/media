class RenameActivationDigestToActivationToken < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :activation_digest, :activation_token
  end
end
