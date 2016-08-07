class MetadataController < ApplicationController
  def search
    if params[:module]
      @contacts = Metadatum.all
    else
      @contacts = Metadatum.order(:order).find_by(module: params[:module])
    end
    render json: @contacts
  end
end