Rails.application.routes.draw do

  get 'histories/index'
  get 'kifus/new'
  get 'kifus/create'
  get 'kifus/show'
  get 'kifus/delete'
  get 'sessions/new'
  root 'application#home'
  get  '/signup',  to: 'users#new'
  post '/signup', to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
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
end
