class Api::V1::UsersController < Api::V1::ApiController
  before_filter :authenticate_request!
  def get_user
    render json: @current_user
  end
end