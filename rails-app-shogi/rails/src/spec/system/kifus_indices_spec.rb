require 'rails_helper'

RSpec.describe "KifusIndices", type: :system do

  before do
    
    @user= FactoryBot.create(:user)
    @kifus = []
    60.times do |i|
      @kifus.push(FactoryBot.create(:kifu,
                                    user_id: @user.id,
                                    player1:Faker::Name.name.slice(0..9),
                                    player2: @user.name,
        )
      )
    end
    @kifus.reverse!
    @user2 = FactoryBot.create(:user,
                                name: "user10",
                                email: "user10@example.com",
                                password: "password",
                                password_confirmation: "password",
                                admin: false,
                                  )
  end

  it "forced login" do
    visit kifus_path
    expect(page).to have_selector("#error_explanation")
  end

  it "work paginate"  do
    log_in_e2e(@user)
    visit kifus_path
    #kifus/index画面に遷移できているか確認
    expect(page).to have_selector(".kifu")
    expect(page).to have_selector(".kifuUrl")
    #paginationが存在するか確認
    expect(page).to have_selector(".pagination")
    for i in 0..19 do
      expect(page).to have_content(@kifus[i].player1)
      expect(page).to have_content(@kifus[i].player2)
    end
    click_on "次", match: :first
    for i in 20..39 do
      expect(page).to have_content(@kifus[i].player1)
      expect(page).to have_content(@kifus[i].player2)
    end
  end

  it "work jump page", js: true do
    log_in_e2e(@user)
    visit kifus_path
    #kifus/index画面に遷移できているか確認
    expect(page).to have_selector(".kifu")
    expect(page).to have_selector(".kifuUrl")
    #kifus/showに遷移する
    first(".kifuUrl").click
    sleep 10
    expect(page).to have_content("show")
    #<<< Todo クリックして遷移するとvueが正しく機能しない問題。新しくページを開くと正しく機能する >>>
    text = ["飛","角","金","銀","桂","香","歩","王"]
    for t in text do
      expect(page).to have_content(t)
    end
  end

  it "another user dont delete kifu" do
    log_in_e2e(@user2)
    visit kifus_path
    expect(page).to have_no_content("delete")
  end

  it "work delete button ", js: true do 

    #まずはログインする
    log_in_e2e(@user) 
    #kifus/indexに遷移する
    visit kifus_path
    #kifus/index画面に遷移できているか確認
    expect(page).to have_selector(".kifu")
    expect(page).to have_selector(".kifuUrl")
    
    player1 = @kifus[0].player1

    #棋譜を削除する
    expect(page).to have_content("delete")
    page.accept_confirm do
      all("#delete")[0].click
    end
    sleep 10

    #削除後再度kifus/index画面に戻っているか確認
    expect(page).to have_selector(".kifu")
    expect(page).to have_selector(".kifuUrl")

    #削除した棋譜が表示されていないか確認
    expect(page).to have_no_content(player1)

    #paginationで遷移先でも正しく動くかテスト

    #次のページへ遷移する
    click_on "次", match: :first
    #棋譜を削除する
    page.accept_confirm do
      all("#delete")[0].click
    end
    sleep 10
    
    #削除後再度kifus/index画面に戻っているか確認
    expect(page).to have_selector(".kifu")
    expect(page).to have_selector(".kifuUrl")
  end

end
