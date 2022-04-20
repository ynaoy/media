require 'rails_helper'

RSpec.describe "KifusIndices", type: :system do

  before do

    @user= FactoryBot.create(:user)
    @kifus = []
    40.times do |i|
      @kifus.push(FactoryBot.create(:kifu,
                                    user_id: @user.id,
                                    player1:Faker::Name.name.slice(0..9),
                                    player2: @user.name,
        )
      )
    end
    @kifus.reverse!

  end

  it "forced login" do
    visit kifus_path
    expect(page).to have_selector("#error_explanation")
  end

  it "work paginate"  do
    log_in_e2e(@user)
    visit kifus_path
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
    first(".kifuUrl").click
    sleep 10
    expect(page).to have_content("show")
    #<<< Todo クリックして遷移するとvueが正しく機能しない問題。新しくページを開くと正しく機能する >>>
    text = ["飛","角","金","銀","桂","香","歩","王"]
    for t in text do
      expect(page).to have_content(t)
    end
  end

end
