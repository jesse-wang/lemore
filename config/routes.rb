Rails.application.routes.draw do
  root 'react#home'

  match '/expert/:username',             to: 'users#expert_show',     via: 'get'

end
