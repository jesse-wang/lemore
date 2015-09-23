Rails.application.routes.draw do

  root 'react#home'

  resources :users, only: [:index, :show, :update, :destroy], path: "u" do 
    member do 
      get :received_comments
    end
  end

  resources :services, only: [:create, :update, :destroy]

  # for facebook & twitter login
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' },
                     skip: [:invitations, :session, :registration],
                     path: ''

  namespace :auth, defaults: { format: :json } do
    post 'login'    => 'sessions#login' 
    post 'register' => 'sessions#register'
  end

  resources :user_comments, only: [:create] 

  match '/expert/:username',             to: 'users#expert_show',     via: 'get'

  # for s3 direct upload
  match '/s3_sign',                      to: 'react#s3_sign',         via: 'get'

end
