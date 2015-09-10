class UsersController < ApplicationController
  def expert_show
    @title = "User"
    @image = "/logo.png"
    @description = "User is ..."
    @url = root_url

    render 'shared/meta'
  end
end
