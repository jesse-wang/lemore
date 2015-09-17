class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    auth_token = cookies['accessToken']

    if auth_token 
      begin 
        id = JWT.decode(auth_token, Rails.application.secrets.secret_key_base)[0]['uid']
        return User.find(id)
      rescue JWT::DecodeError
        # authentication_error
        return false
      rescue JWT::ExpiredSignature
        token_expiration_error  
        # return false
      end
    else
      return false
    end
  end
end
