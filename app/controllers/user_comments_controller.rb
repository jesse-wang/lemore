class UserCommentsController < ApplicationController

  def create
    comment = current_user.comments.build(comment_params)

    if comment.save
      user = User.find(comment_params[:receiver_id])
      render json: user.received_comments.to_json(methods: [:receiver_info, :commenter_info]), status: :ok
    else
      render json: comment.errors.as_json(full_messages: true), status: 422
    end
  end

   private

    def comment_params
      params.permit(:receiver_id, :content, :rating)
    end

end