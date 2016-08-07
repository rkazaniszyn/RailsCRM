Rails.application.routes.draw do
  root to:'page#index';
  namespace :api, module:nil do
    namespace :v1, module:nil,  defaults: { format: :json } do
      resources :Contacts, controller: :contacts
      get '/metadata/:module', to: 'metadata#search'
    end
  end
  match '*path', to: 'page#index', via: [:get]
end
