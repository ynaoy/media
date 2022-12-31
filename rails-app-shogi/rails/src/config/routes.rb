Rails.application.routes.draw do

  get 'password_resets/create'
  get 'kentos/create'
  get 'histories/index'
  get 'sessions/new'
  root 'application#home'
  get  '/signup',  to: 'users#new'
  post '/signup', to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get '/login_check', to: 'sessions#login_check'
  get '/search', to: 'searchs#search'
  post '/favorites', to:'favorites#create'
  delete '/favorites', to:'favorites#destroy'
  resources :users do
    member do
      get :history
      get :favorite #users_controller内のメソッド
    end
  end
  resources :kifus, only: %i[new create show index destroy]
  resources :kentos, only: %i[create show]
  resources :account_activations, only: %i[create]
  resources :password_resets, only: %i[create]
end
