class UsersController < ApplicationController
  def expert_show
    @title = "Expert"
    @image = "/logo.png"
    @description = "Expert is ..."
    @url = root_url

    render 'shared/meta'
  end

  def show
    user = User.find_by(params[:username])

    @title = user.username
    @image = "/logo.png"
    @description = user.headline
    @url = user_url(user)

    respond_to do |format|
      format.html { render 'shared/meta'}
      format.json { render json: user.as_json, status: :ok }
    end
  end
  
  def update
    @user = User.find_by(username: params[:username])

    case params[:field]
    when 'portfolio'
      @user.update!(portfolio: params[:content])
    end
    
    if @user.save!
      render json: @user.as_json, status: :ok
    else 
      render json: @user.errors.as_json(full_messages: true), status: 422
    end
  end

end
