import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import Search from "../../components/SearchItems.vue"

describe("SearchItems test", async() => {

  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const {users_and_kifus } = TestHelper("")
  const wrapper = Mount( Search,  { loginFlg: true, admin:false, user_id: 1, csrf_token:"this is csrf_token" },
                                  { search_data: users_and_kifus(), query: "TestUser"}) 

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<user-items")
    expect(wrapper.html()).toContain("<kifus-items")
  })

  it("テキストが表示されているかチェック", () => {
    expect(wrapper.text()).toContain("ユーザー")
    expect(wrapper.text()).toContain("棋譜")
  })

  it("ユーザーが空の時にテキストと子コーポネントが正しく表示されているかチェック", () => {
    const wrapper_no_user = Mount( Search,
                                  { loginFlg: true, admin:false, user_id: 1, csrf_token:"this is csrf_token" },
                                  { search_data: users_and_kifus(0, 60), query: "TestUser"}) 

    expect(wrapper_no_user.text()).not.toContain("ユーザー")
    expect(wrapper_no_user.html()).not.toContain("<user-items")
    expect(wrapper_no_user.text()).toContain("棋譜")
    expect(wrapper_no_user.html()).toContain("<kifus-items")

  })

  it("棋譜が空の時にテキストと子コーポネントが正しく表示されているかチェック", () => {
    const wrapper_no_kifu = Mount( Search,
                                  { loginFlg: true, admin:false, user_id: 1, csrf_token:"this is csrf_token" },
                                  { search_data: users_and_kifus(60, 0), query: "TestUser"}) 

    expect(wrapper_no_kifu.text()).toContain("ユーザー")
    expect(wrapper_no_kifu.html()).toContain("<user-items")
    expect(wrapper_no_kifu.text()).not.toContain("棋譜")
    expect(wrapper_no_kifu.html()).not.toContain("<kifus-items")

  })

  it("ユーザーも棋譜が空の時にテキストと子コーポネントが正しく表示されているかチェック", () => {
    const wrapper_no_all = Mount( Search,
                                  { loginFlg: true, admin:false, user_id: 1, csrf_token:"this is csrf_token" },
                                  { search_data: users_and_kifus(0, 0), query: "TestUser"})
                                  
    expect(wrapper_no_all.text()).not.toContain("ユーザー")
    expect(wrapper_no_all.html()).not.toContain("<user-items")
    expect(wrapper_no_all.text()).not.toContain("棋譜")
    expect(wrapper_no_all.html()).not.toContain("<kifus-items")

    expect(wrapper_no_all.html()).toContain("「TestUser」の検索結果はありません")

  })
})