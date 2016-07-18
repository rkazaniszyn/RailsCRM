class ContactsController < ApplicationController
  def index
    @contacts = Contact.all
    render json: @contacts
  end
  def show
    # @contact = Contact.all
    # render json: @contacts
  end
end
