class Api::V1::ApiController < ::ApplicationController
  def not_found
    render json: {errors: ['Route not found']} , status: 404
  end
end