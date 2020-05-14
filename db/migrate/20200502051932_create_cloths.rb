class CreateCloths < ActiveRecord::Migration[5.2]
  def change
    create_table :cloths do |t|
      t.string "cloth"
      t.string "text"
      t.timestamps
    end
  end
end
