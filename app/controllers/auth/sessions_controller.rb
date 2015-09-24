module Auth
  class SessionsController < ApplicationController
    # skip_before_action :authenticate_user_from_token!

    # POST /auth/login
    def login
      @user = User.find_for_database_authentication(login: params[:login])

      return invalid_login_attempt unless @user

      if @user.valid_password?(params[:password])
        # not signning in , we dont need a session
        # sign_in :user, @user

        # retrun a jwt
        @jwt = JWT.encode({uid: @user.id, exp: 10.years.from_now.to_i}, Rails.application.secrets.secret_key_base)

        render json: {access_token: @jwt, user_info: @user.as_json(include: :services, methods: [:raterCount, :averageRating])}, status: 200
        # render json: @user, serializer: SessionSerializer, root: nil
      else
        invalid_login_attempt
      end
    end

    # POST /auth/register
    def register

      @user = User.find_for_database_authentication(email: params[:email])

      return invalid_signup_attempt if @user

      @user = User.create!({email: params[:email] , username: params[:username] , password: params[:password] , password_confirmation: params[:passwordConfirmation] })

      # not signning in , we dont' need a session
      # sign_in :user, @user

      @jwt = JWT.encode({uid: @user.id, exp: 10.years.from_now.to_i}, Rails.application.secrets.secret_key_base)

      render json: {access_token: @jwt, user_info: @user.as_json(include: :services, methods: [:raterCount, :averageRating])}, status: 200   
    end 

    def password_recovery
      respond_to do |format|
        format.html { 
          @title = "Product Ninja - Password Recovery"
          @image = "/logo.png"
          @description = "Password Recovery"
          @url = password_recovery_url

          render 'shared/meta'
        }
        format.json { 
          user = User.find_by(email: params[:email])
          if user 
            user.send_reset_password_instructions
            render json: {}, status: :ok 
          else 
            render json: {}, status: :unprocessable_entity 
          end
        }
      end
    end

    private

      def invalid_login_attempt
        warden.custom_failure!
        render json: {error: 'Invalid_login_attempt'}, status: :unauthorized
      end

      def invalid_signup_attempt
        warden.custom_failure!
        render json: {error: 'Email has already been taken'} , status: :unauthorized
      end

  end
end

# curl localhost:3000/auth/login --data "email=test1@test.com&password=test1test1"