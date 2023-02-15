import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import UserFavorite from "../../components/UserFavorite.vue"

describe("UserFavorite test", async() => {

  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { kifus_data, mock_func } = TestHelper()
  const wrapper = Mount( UserFavorite, { loginFlg: true, user_id: 1, csrf_token:"this is csrf_token" },
                                    { favorite_kifus: kifus_data()}) 
  
  // navigateToメソッドをモックする。force_login(false)メソッド内でこれが呼ばれたら成功
  const spy_navigate = mock_func("navigateTo")

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("子コンポーネントとテキストが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<kifus-items")
    expect(wrapper.text()).toContain("お気に入り")
  })

  it("ログインしていない時、リダイレクトされているかチェック", () => {
    const wrapper_not_login = Mount( UserFavorite, { loginFlg: false, user_id: 1 },
                                                { favorite_kifus: kifus_data()}) 
    expect(spy_navigate).toHaveBeenCalled()
  })

})