Rails.application.routes.draw do
  root to:'page#index';
  namespace :api, module:nil do
    namespace :v1, module:nil,  defaults: { format: :json } do
      resources :contacts, controller: :contacts
    end
  end
  get 'hello_world', to: 'page#index'
  match '*path', to: 'page#index', via: [:get]
end
