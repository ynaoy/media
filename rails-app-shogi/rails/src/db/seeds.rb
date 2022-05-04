# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

=begin
#Tag
tag_1 = ["角換わり","相掛かり","雁木","矢倉"]
tag_2 = ["棒銀","早繰り銀","腰掛銀"]

#まずはtag_2の中身をcreateする
for n in tag_2 do
  Tag.create!(name: n)
end

#tag_1[i]+tag_2[j]で全探索してcreateする。ついでにtag_1の中身をcreateする
for i in tag_1 do
  Tag.create!(name: i)
  for j in tag_2 do
    Tag.create!(name: i+j )
  end
end

another_tag = ["横歩取り","右玉","筋違い角","嬉野流","アヒル戦法",
"対振り急戦","対振り持久戦","向かい飛車","三間飛車","石田流三間飛車","四間飛車","中飛車",
"角交換向かい飛車","角交換三間飛車","角交換四間飛車","角交換中飛車","相振り飛車",]
#another_tagの中身をcreateする
for n in another_tag do
  Tag.create!(name: n)
end

#User
User.create!(name:  admin_user,
              email: admin_user@example.com,
              password:              password,
              password_confirmation: password,
              admin: true,
              )
99.times do |n|
  name = Faker::Name.name.slice(0..9)
  email = "example-#{n+1}@example.com"
  password = "password"
  User.create!(name:  name,
              email: email,
              password:              password,
              password_confirmation: password,
              )


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
=end

