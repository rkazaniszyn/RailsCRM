class Api::V1::ContactsController < Api::V1::ApiController
  before_filter :authenticate_request!
  def index
    @contacts = Contact.all
    render json: @contacts
  end
  def show
    @contact = Contact.find(params[:id])
    render json: @contact
  end
end
