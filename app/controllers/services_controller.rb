class ServicesController < ApplicationController

  # def index
  #   users = User.all

  #   @title = "All Users"
  #   @image = "/logo.png"
  #   @description = "All Users"
  #   @url = users_url

  #   respond_to do |format|
  #     format.html { render 'shared/meta'}
  #     format.json { render json: users.as_json, status: :ok }
  #   end
  # end

  def create
    if current_user 
      service = current_user.services.build(service_params)
    end

    if service.save
      render json: current_user.as_json(include: :services), status: :ok
    else
      render json: service.errors.as_json(full_messages: true), status: 422
    end 
  end

  # def show
  #   user = User.find_by(username: params[:id])

  #   @title = user.username
  #   @image = "/logo.png"
  #   @description = user.headline
  #   @url = user_url(user)

  #   respond_to do |format|
  #     format.html { render 'shared/meta'}
  #     format.json { render json: user.as_json, status: :ok }
  #   end
  # end
  
  def update
    user = User.find_by(username: params[:username])

    # case params[:field]
    #   when 'portfolio'
    #     user.update!(portfolio: params[:content])
    #   when 'profile'
    #     user.update!(profile: params[:content])
    # end
    
    if user.update!(user_params)
      render json: user.as_json, status: :ok
    else 
      render json: user.errors.as_json(full_messages: true), status: 422
    end
  end

  def destroy
    service = Service.find(params[:id])
    user = service.user
    
    if service.destroy
      render json: current_user.as_json(include: :services), status: :ok
    else
      render json: service.errors.as_json(full_messages: true), status: 422
    end 
  end

  private

    def service_params
      params.permit(:name, :description, :price)
    end

end
