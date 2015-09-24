class UserComment < ActiveRecord::Base
  belongs_to :receiver, class_name: "User"
  belongs_to :commenter, class_name: "User"

  validates :receiver_id, presence: true
  validates :commenter_id, presence: true

  default_scope -> { order('created_at DESC') }

  def receiver_info
    receiver.as_json(include: :services, methods: [:raterCount, :averageRating])
  end

  def commenter_info
    commenter.as_json(include: :services, methods: [:raterCount, :averageRating])
  end

end
