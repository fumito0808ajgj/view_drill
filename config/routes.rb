Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#index'
  resources :users, only: [:edit, :update]
  resources :users, only: [:index, :new]
end
