class AddPurposeToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :purpose, :string
  end
end
