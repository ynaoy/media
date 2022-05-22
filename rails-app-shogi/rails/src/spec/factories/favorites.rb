FactoryBot.define do
  factory :favorite do
    user_id { 1 }
    kifu_id { 1 }
    created_at { Time.zone.now }
  end
end
