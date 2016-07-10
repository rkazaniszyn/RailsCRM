Rails.application.routes.draw do
  root to:'page#index';
  get 'hello_world', to: 'page#index'
  match '*path', to: 'page#index', via: [:get]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
