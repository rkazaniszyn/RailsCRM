class CreateAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :email_address
      t.string :website
      t.string :office_phone

      t.timestamps
    end
  end
end