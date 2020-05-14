class RemovePurposeFromPages < ActiveRecord::Migration[5.2]
  def change
    remove_column :pages, :purpose, :string
  end
end
