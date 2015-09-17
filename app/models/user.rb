class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, #:timeoutable, :confirmable, 
         omniauth_providers: [:facebook, :twitter], authentication_keys: [:login]

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["username = :value OR email = :value", { :value => login.downcase }]).first
    else
      where(conditions).first
    end
  end

  def construct_info(current_user)
    {
      id: self.username,
      data: {
        id:              self.id,
        username:        self.username,
        email:           self.email,
        # avatar:          self.profile.avatar.url || self.image || "/icons/hobbyist_ninja_male.png",
        first_name:      self.first_name,
        last_name:       self.last_name,
        headline:        self.headline,
        # sex:             self.profile.sex,
        # birthday:        self.profile.birthday,
        # bio:             self.profile.bio,
        # twitterId:       self.profile.twitter_id,
        # facebookId:      self.profile.facebook_id,
        # reputation:      self.reputation_for(:comment_votes).to_i,
        # coin:            self.credit.to_i,
        # badges:          self.profile.badges,
        # is_admin:        self.is_admin,
        # projects_count:  self.projects.count,
        # upvotes_count:   Project.evaluated_by(:user_project_votes, self).count,
        # comments_count:  self.comments.count,
        # wants_count:     self.project_likes.count,
        # cools_count:     self.project_feedbacks.where(content: 'cool').count,
        # owns_count:      self.project_owns.count,
        # following_count: self.following.count,
        # followers_count: self.followers.count,
        # following:       current_user ? current_user.following?(self) : false
      }
    }
  end

end
