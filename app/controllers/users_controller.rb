class UsersController < ApplicationController
  # def expert_show
  #   @title = "Expert"
  #   @image = "/logo.png"
  #   @description = "Expert is ..."
  #   @url = root_url

  #   render 'shared/meta'
  # end

  def index
    users = User.all

    @title = "All Users"
    @image = "/logo.png"
    @description = "All Users"
    @url = users_url

    respond_to do |format|
      format.html { render 'shared/meta'}
      format.json { render json: users.as_json(include: :services), status: :ok }
    end
  end

  def show
    user = User.find_by(username: params[:id]) || User.find_by(nickname: params[:id])

    @title = user.username
    @image = "/logo.png"
    @description = user.headline
    @url = user_url(user)

    respond_to do |format|
      format.html { render 'shared/meta'}
      format.json { render json: user.as_json(include: :services), status: :ok }
    end
  end
  
  def update
    user = User.find_by(username: params[:username])

    # case params[:field]
    #   when 'portfolio'
    #     user.update!(portfolio: params[:content])
    #   when 'profile'
    #     user.update!(profile: params[:content])
    # end
    
    if user.update!(user_params)
      render json: user.as_json(include: :services), status: :ok
    else 
      render json: user.errors.as_json(full_messages: true), status: 422
    end
  end

  def received_comments
    comments = User.find_by(username: params[:id]).received_comments
    render json: comments.to_json(methods: [:receiver_info, :commenter_info]), status: :ok
  end

  def destroy
  end

  private

    def user_params
      params.permit(:avatar, :nickname, :position, :headline, :portfolio, :profile)
    end

end
