require 'rails_helper'

RSpec.describe User, type: :model do

  before do
    @user = User.new(name: "Example_User", email: "user@example.com",
                     password: "password", password_confirmation: "password")
  end

  it "should be valid" do
    expect(@user).to be_valid
  end

  it "should create activation_token before created" do
    @user.save
    expect(@user.activation_token.nil?).to eq false
  end
  
  it "name should be present" do
    @user.name = "     "
    expect(@user).not_to be_valid
  end

  it "email should be present" do
    @user.email = "     "
    expect(@user).not_to be_valid
  end

  it "name should not be too long" do
    @user.name = "a" * 17
    expect(@user).not_to be_valid
  end

  it "email should not be too long" do
    @user.email = "a" * 244 + "@example.com"
    expect(@user).not_to be_valid
  end

  it "email validation should accept valid addresses" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      expect(@user).to be_valid, "#{valid_address.inspect} should be valid"
    end
  end

  it "email validation should reject invalid addresses" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com foo@bar..com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      expect(@user).not_to be_valid, "#{invalid_address.inspect} should be invalid"
    end
  end

  it "email addresses should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    expect(duplicate_user).not_to be_valid
  end

  it "email addresses should be saved as lower-case" do
    mixed_case_email = "Foo@ExAMPle.CoM"
    @user.email = mixed_case_email
    @user.save
    expect(mixed_case_email.downcase).to eq @user.reload.email
  end

  it "password should be present (nonblank)" do
    @user.password = @user.password_confirmation = " " * 8
    expect(@user).not_to be_valid
  end

  it "password should have a minimum length" do
    @user.password = @user.password_confirmation = "a" * 7
    expect(@user).not_to be_valid
  end

  it "is_favorite_kifu? should work" do
    @user.save
    @user.favorites.create!(kifu_id:1)

    expect(@user.is_favorite_kifu?(kufu_id = 1)).to eq true
    expect(@user.is_favorite_kifu?(kifu_id = 2)).to eq false
  end

  describe "authenticated?" do

    it "if token is wrong, authenticated? return false" do
      token = User.new_token
      @user.remember_digest = User.digest(token)
  
      expect(@user.authenticated?(:remember, "wrong_token")).to eq false
    end

    it "authenticated? should work" do
      token = User.new_token
      @user.remember_digest = User.digest(token)

      expect(@user.authenticated?(:remember, token)).to eq true
    end

  end

  describe "correct_token?" do
    before do
      @user.save
    end

    it "if token is wrong, correct_token? return false" do
      expect(@user.correct_token?(:activation, "wrong_token")).to eq false
    end

    it "correct_token? should work" do
      expect(@user.correct_token?(:activation, @user.activation_token)).to eq true
    end

  end

  it "activate should work" do
    @user.save
    expect(@user.activated).to eq false
    expect(@user.activated_at).to be nil

    @user.activate
    expect(@user.activated).to eq true
    expect(@user.activated_at).not_to be nil

  end

  describe "expired?" do
    before do
      @user.save
    end

    it "if created_at is expired, expired? return true" do
      @user.created_at = 2.hours.ago
      @user.save
      expect(@user.expired?(:created)).to eq true
    end

    it "if created_at is not expired, expired? return false" do
      expect(@user.expired?(:created)).to eq false
    end

  end

end
