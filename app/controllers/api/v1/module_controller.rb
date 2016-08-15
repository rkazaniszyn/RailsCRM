class Api::V1::ModuleController < Api::V1::ApiController
  rescue_from ::ActiveRecord::RecordNotFound, :with => :record_not_found
  before_filter :authenticate_request!
  def index
    records = model_name.constantize.all
    render json: records
  end
  def show
    record = model_name.constantize.find(params[:id])
    render json: record
  end
  def update
    record = model_name.constantize.find(params[:id])
    record.update!(module_params)
    render json: record
  end
  def create
    record = model_name.constantize.create(module_params)
    record.save!
    render json: record
  end
  def destroy
    record = model_name.constantize.find(params[:id])
    record.destroy
    response = [status: 'ok']
    render json: response
  end
  def record_not_found
    render json: {errors: ['Record not found']}, status: 404
  end
  def module_params
    params
  end
end