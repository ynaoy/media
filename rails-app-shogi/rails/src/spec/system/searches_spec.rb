require 'rails_helper'

RSpec.describe "Searches", type: :system do
  before do
    @search ="search"
    @path_with_params = "#{search_path}?query=#{@search}"

    @user= FactoryBot.create(:user,name:@search)

    @kifus = []
    60.times do |i|
      @kifus.push(kifu = FactoryBot.create(:kifu,
                                            title: "sample_#{i}",
                                            user_id: @user.id,
                                            player1:Faker::Name.name.slice(0..9),
                                            player2: @user.name,)
        )
    end
    @kifus.reverse!

  end

  it "search user" do

    visit @path_with_params
    expect(page).to have_selector(".user")
    expect(page).to have_selector("#user_name")
    within(".user") do
      expect(page).to have_content( @search )
    end
  end

  it "search kifu with player's name"  do

    visit @path_with_params
    expect(page).to have_selector(".kifu")
    expect(page).to have_selector(".kifuUrl")
    for i in 0..19 do
      expect(page).to have_content( @kifus[i].title )
    end

  end

  it "search tag" do

    @tag = FactoryBot.create(:tag, name:"hello")
    kifu_tag = @kifus[0].kifu_tags.build(tag_id:@tag.id)
    kifu_tag.save

    visit "#{search_path}?query=#{@tag.name}"

    expect(page).to have_content(@kifus[0].title)
    expect(page).to have_no_content(@kifus[1].title)

  end

  it "work paginate"  do

    visit @path_with_params
    #paginationが存在するか確認
    expect(page).to have_selector(".pagination")
    for i in 0..19 do
      expect(page).to have_content(@kifus[i].title)
    end
    click_on "次", match: :first
    #2ページ以降にはuserが表示されずkifuだけが表示される
    expect(page).to have_no_selector(".user")
    for i in 20..39 do
      expect(page).to have_content(@kifus[i].title)  
    end

  end

  it "work jump user page", js: true do

    visit @path_with_params
    expect(page).to have_selector("#user_name")
    #users/showに遷移する
    first("#user_name").click
    sleep 10
    expect(page).to have_selector(".user_show")
    expect(page).to have_content(@user.name)
  end

  it "work jump kifu page", js: true do

    visit @path_with_params
    expect(page).to have_selector(".kifuUrl")
    #kifus/showに遷移する
    first(".kifuUrl").click
    sleep 10
    expect(page).to have_content("show")
    text = ["飛","角","金","銀","桂","香","歩","王"]
    for t in text do
      expect(page).to have_content(t)
    end
  end

end
