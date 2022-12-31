class User < ApplicationRecord

  attr_accessor :remember_token, :reset_token
  has_many :kifus, dependent: :destroy
  has_many :histories, dependent: :destroy
  has_many :favorites, dependent: :destroy
  before_save   :downcase_email
  before_create :create_activation_token
  validates :name,  presence: true, length: { maximum: 16 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, presence: true, length: { minimum: 8 }, allow_nil: true

  # 渡された文字列のハッシュ値を返す
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  # ランダムなトークンを返す
  def User.new_token
    SecureRandom.urlsafe_base64
  end

  # ランダムな8桁の数字を返す
  def User.random_int
    SecureRandom.random_number(99999999)
  end

  # 永続セッションのためにユーザーをデータベースに記憶する
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # 渡されたトークンがダイジェストと一致したらtrueを返す
  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end

  # 渡されたトークンがUserモデルの"#{attribute}_token"と一致するかどうか
  def correct_token?(attribute, token)
    return false if token.nil? # tokenもuser_tokenもnilだったら、trueが返ってしまうから
    user_token = send("#{attribute}_token")
    return user_token == token
  end

  # アカウントを有効にする
  def activate
    update_columns(activated: true, activated_at: Time.zone.now)
  end

  # 有効化用のメールを送信する
  def send_activation_email
    UserMailer.account_activation(self).deliver_now
  end

  # 8文字のパスワード再設定の属性を設定する
  def create_reset_digest
    self.reset_token = SecureRandom.urlsafe_base64(6) #urlsafe_base64は引数nの4/3倍の長さの文字列が生成
    update_columns(reset_digest: User.digest(reset_token), reset_sent_at: Time.zone.now)
  end
  
  # パスワード再設定のメールを送信する
  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  # ユーザーのログイン情報を破棄する
  def forget
    update_attribute(:remember_digest, nil)
  end

  #Userモデルからattributeをstrで検索する
  def User.search_user(attribute = nil,str = nil)
    if attribute && str
      if attribute!="id"
        str = "%"+str+"%"
      end
      User.where("#{attribute} LIKE ?",str)
    end
  end

  def admin?
    self.admin
  end

  def is_favorite_kifu?(kifu_id) 
    !self.favorites.where(kifu_id: kifu_id).empty?
  end

  # UserモデルのDateTime型を取り出して、2時間以上経過していたらfalseを返す。
  def expired?(attribute)
    time = send("#{attribute}_at")
    return true if time.nil?
    time < 2.hours.ago
  end

  private

    # メールアドレスをすべて小文字にする
    def downcase_email
      email.downcase!
    end

    # 有効化トークンとダイジェストを作成および代入する
    def create_activation_token
      self.activation_token  = User.random_int
    end
end
