class ContactsController < ApplicationController
  def index
    @contacts = Contact.all
    render json: @contacts
  end
  def show
    @contact = Contact.find(params[:id])
    render json: @contact
  end
end