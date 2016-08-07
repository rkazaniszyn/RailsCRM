# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Metadatum.create({module: 'Contacts', field: 'first_name', order:1, label:'FIRST_NAME', required:1, field_type:'text'})
Metadatum.create(module: 'Contacts', field: 'last_name', order:2, label:'LAST_NAME', field_type:'text', required:1)
Metadatum.create(module: 'Contacts', field: 'birthdate', order:3, label:'BIRTH_DATE', field_type:'date', required:0)
Metadatum.create(module: 'Contacts', field: 'email_address', order:4, label:'BIRTH_DATE', field_type:'email', required:0)