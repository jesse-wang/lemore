class CreateUserComments < ActiveRecord::Migration
  def change
    create_table :user_comments do |t|
      t.text :content
      t.integer :commenter_id,   index: true
      t.integer :receiver_id,    index: true
      t.decimal :rating,         null: false, default: 0

      t.timestamps null: false
    end
  end
end
