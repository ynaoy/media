FactoryBot.define do
  factory :user do
    name { "User3" }
    email { "user3@example.com" }
    password_digest { User.digest('password') }
    admin { true }
    activated { true }
    activated_at { Time.zone.now }
  end
end