# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
=begin
#User
99.times do |n|
  name = Faker::Name.name.slice(0..9)
  email = "example-#{n+1}@example.com"
  password = "password"
  User.create!(name:  name,
              email: email,
              password:              password,
              password_confirmation: password,
              )
=end

#棋譜
content = "棋戦：
          戦型：
          開始日時：
          終了日時：
          手合割：平手
          先手：Player1
          後手：Player2
          手数----指手---------消費時間--
           1 ７六歩(77)        ( 0:01/00:00:01)
           2 ８四歩(83)        ( 0:02/00:00:02)
           3 ２六歩(27)        ( 0:01/00:00:02)
           4 ８五歩(84)        ( 0:01/00:00:03)
           5 ２五歩(26)        ( 0:01/00:00:03)
           6 ３二金(41)        ( 0:01/00:00:04)
           7 ７七角(88)        ( 0:01/00:00:04)
           8 ３四歩(33)        ( 0:01/00:00:05)
           9 ７八銀(79)        ( 0:01/00:00:05)
           10 ７七角成(22)       ( 0:01/00:00:06)
           まで10手で後手の勝ち"

user = User.find_by(name:"admin_user")
99.times do |n|
  name = Faker::Name.name.slice(0..9)
  user.kifus.create!( player1: name,
                      player2: user.name,
                      win: 2,
                      content: content)
end

