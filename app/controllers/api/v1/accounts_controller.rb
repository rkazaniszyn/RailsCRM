class Api::V1::AccountsController < Api::V1::ModuleController
  def model_name
    'Account'
  end
  def module_params
    params.permit(:name, :office_phone, :email_address, :website)
  end
end