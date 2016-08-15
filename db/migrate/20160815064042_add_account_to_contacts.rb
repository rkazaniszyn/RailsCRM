class AddAccountToContacts < ActiveRecord::Migration[5.0]
  def change
    add_reference :contacts, :account, foreign_key: true, :null => true
  end
end
