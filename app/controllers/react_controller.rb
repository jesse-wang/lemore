class ReactController < ApplicationController
  def home
    @title = "LeMore"
    @image = "/logo.png"
    @description = "LeMore is ..."
    @url = root_url

    render 'shared/meta'
  end

  def s3_sign
    options = {path_style: true}
    headers = {"Content-Type" => params[:contentType], "x-amz-acl" => "public-read"}

    if Rails.env.production?
      bucket = 'lemore-production'
    elsif Rails.env.staging?
      bucket = 'lemore-staging'
    elsif Rails.env.development?
      bucket = 'lemore-development'
    end
      
    @url = FOG.put_object_url(bucket, "uploads/#{params[:objectName]}", 15.minutes.from_now.to_time.to_i, headers, options)

    respond_to do |format|
      format.json { render json: {signedUrl: @url} }
    end
  end

end
