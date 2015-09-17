Rails.application.routes.draw do

  resources :users, only: [:show, :edit, :update, :destroy], path: "u" do 
  end
  
  # for facebook & twitter login
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' },
                     skip: [:invitations, :session, :registration],
                     path: ''

  namespace :auth, defaults: { format: :json } do
    post 'login'    => 'sessions#login' 
    post 'register' => 'sessions#register'
  end
  
  root 'react#home'

  match '/expert/:username',             to: 'users#expert_show',     via: 'get'

end
