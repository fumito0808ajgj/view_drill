class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :name
      t.string :text, null: false
      t.text :image, null: false
      t.timestamps
    end
  end
end
