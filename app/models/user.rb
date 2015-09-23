class User < ActiveRecord::Base
  validates_exclusion_of :username, in: %w( admin superuser me invitation), message: "not available."
  validates :username, uniqueness: { allow_blank: false, case_sensitive: false }, format: { with: /\A\w*\z/, message: "must contain letters (a-z) and numbers (0-9) only." }

  has_many :services, dependent: :destroy

  has_many :received_comments, class_name:  "UserComment", foreign_key: "receiver_id", dependent: :destroy
  has_many :comments, class_name:  "UserComment", foreign_key: "commenter_id", dependent: :destroy

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

end
