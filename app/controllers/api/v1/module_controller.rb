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
    record = self.class::MODEL.constantize.create(module_params)
    render json: record
  end
  def destroy
    record = self.class::MODEL.constantize.find(params[:id])
    record.destroy
    response = [status: 'ok']
    render json: response
  end
  def module_params
    params
  end
end