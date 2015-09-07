class ReactController < ApplicationController
  def home
    @title = "LeMore"
    @image = "/logo.png"
    @description = "LeMore is ..."
    @url = root_url

    render 'shared/meta'
  end
end
