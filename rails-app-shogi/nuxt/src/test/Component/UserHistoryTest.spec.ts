import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import UserHistory from "../../components/UserHistory.vue"

describe("UserHistory test", async() => {
  
  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { mock_func } = TestHelper()
  const { Mount } = MountHelper()
  const wrapper = Mount( UserHistory, { loginFlg: true, user_id: 1, csrf_token:"this is csrf_token" },
                                      { hist_data:"" }) 
  // navigateToメソッドをモックする
  const spy_navigate = mock_func("navigateTo")

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("テキストと子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.text()).toContain("閲覧履歴")
    expect(wrapper.html()).toContain("<history-items")
  })

  it("ログインしていない時、リダイレクトされているかチェック", () => {
    const wrapper_not_login = Mount( UserHistory, { loginFlg: false, 
                                                    user_id: 1,
                                                    csrf_token:"this is csrf_token" },
                                                { hist_data:""}) 
    expect(spy_navigate).toHaveBeenCalled()
  })

})