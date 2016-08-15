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
  def all
    meta = Metadatum.order(:order).all
    modules_data = {}
    meta.each do |record|
      if !modules_data.key?(record.module)
        modules_data[record.module] = []
      end
      record.label = I18n.t record.label
      modules_data[record.module].push record
    end
    render json: {modules_list: [:Accounts, :Contacts], modules: modules_data}
  end
end