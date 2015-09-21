class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.references :user, index: true
      t.string     :name
      t.text       :description
      t.decimal    :price, precision: 16, scale: 2, null: false, default: 0

      t.timestamps null: false
    end
  end
end
