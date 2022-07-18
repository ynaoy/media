import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import UserHistory from "../../components/UserHistory.vue"

describe("UserHistory test", async() => {

  // nuxt独自のメソッドnavigateToをモックする。force_login(false)メソッド内でこれが呼ばれたら成功
  const spy_navigate = vi.fn()
  vi.stubGlobal("navigateTo", spy_navigate)
  
  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const wrapper = Mount( UserHistory, { loginFlg: true, user_id: 1, csrf_token:"this is csrf_token" },
                                      { hist_data:"" }) 

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