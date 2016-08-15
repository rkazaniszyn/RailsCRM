class Api::V1::ContactsController < Api::V1::ModuleController
  def model_name
    'Contact'
  end
  def module_params
    params.permit(:first_name, :last_name, :email_address, :birthdate)
  end
end