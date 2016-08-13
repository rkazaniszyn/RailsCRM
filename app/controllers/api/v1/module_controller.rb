class Api::V1::ModuleController < Api::V1::ApiController
  before_filter :authenticate_request!
  def index
    records = self.class::MODEL.constantize.all
    render json: records
  end
  def show
    record = self.class::MODEL.constantize.find(params[:id])
    render json: record
  end
  def update
    record = self.class::MODEL.constantize.find(params[:id])
    record.update(module_params)
    render json: record
  end
  def create

  end
  def destroy

  end
  def module_params
    params
  end
end