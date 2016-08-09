class Api::V1::MetadataController < Api::V1::ApiController
  before_filter :authenticate_request!
  def search
    if params[:module]
      @contacts = Metadatum.all
    else
      @contacts = Metadatum.order(:order).find_by(module: params[:module])
    end
    render json: @contacts
  end
end