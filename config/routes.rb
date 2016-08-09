Rails.application.routes.draw do
  devise_for :users
  root to:'page#index';
  namespace :api do
    namespace :v1, defaults: { format: :json } do
      resources :Contacts, controller: :contacts
      get '/metadata/:module', to: 'metadata#search'
      post '/auth_user', to: 'authentication#authenticate_user'
    end
  end
  match '*path', to: 'page#index', via: [:get]
end