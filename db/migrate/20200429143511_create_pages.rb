class CreatePages < ActiveRecord::Migration[5.2]
  def change
    create_table :pages do |t|
      t.string :weathers
      t.string :item
      t.string :purpose
      t.string :commnt
      t.timestamps
    end
  end
end
