Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#index'
  resources :users, only: [:index, :show, :edit, :update]
  resources :pages, only: [:index, :new]
  resources :posts do
    resources :comments, only: :create
    collection do
      get 'search'
    end
  end
end
