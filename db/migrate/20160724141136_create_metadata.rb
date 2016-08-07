class CreateMetadata < ActiveRecord::Migration[5.0]
  def change
    create_table :metadata do |t|
      t.string :module
      t.string :field
      t.string :label
      t.string :field_type
      t.integer :order
      t.boolean :required
      t.string :comment

      t.timestamps
    end
  end
end
