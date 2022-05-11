module TestHelper

  # テストユーザーがログイン中の場合にtrueを返す
  def is_logged_in?
    !session[:user_id].nil?
  end

  # テストユーザーとしてログインする
  def log_in_as(user)
    post login_path, params: { session: { email: user.email,
                                         password: "password" } }

  end

  # E2Eでテストユーザーとしてログインする
  def log_in_e2e(user)
    visit login_path
    fill_in "メールアドレス", with: user.email
    fill_in "パスワード", with: "password"
    click_on "ログインする"

  end

  #userを大量に作成
  def make_users(name:"", email:"", password:"password", admin:false, n:60)
    users = []
    n.times do |i|
      users.push(FactoryBot.create(:user,
                                    name:  (name != "")?  name:  Faker::Name.name.slice(0..9),
                                    email: (email != "")? email: Faker::Internet.email,
                                    password: password,
                                    password_confirmation: password,
                                    admin: admin,
                                  )
      )
    end
    users.reverse!
  end

  # kifuを大量に作成
  def make_kifus(title:nil, user_id:1, player1:"", player2:"", n:60)
    kifus = []
    n.times do |i|
      kifus.push(FactoryBot.create(:kifu,
                                    title:   (!title.nil?)? title: "sample_#{i}",
                                    user_id: user_id,
                                    player1: (player1 != "")? player1: Faker::Name.name.slice(0..9),
                                    player2: (player2 != "")? player2: Faker::Name.name.slice(0..9),
        )
      )
    end
    kifus.reverse!
  end

  # paginationが正常に動作しているかを確認
  def work_paginate(users:nil,kifus:nil)

    #paginationが存在するか確認
    expect(page).to have_selector(".pagination")
    for i in 0..19 do
      expect(page).to have_content(users[i].name) if !users.nil?
      expect(page).to have_content(kifus[i].title) if !kifus.nil?
    end
    click_on "次", match: :first
    for i in 20..39 do
      expect(page).to have_content(users[i].name) if !users.nil?
      expect(page).to have_content(kifus[i].title) if !kifus.nil?
    end
    
  end

end