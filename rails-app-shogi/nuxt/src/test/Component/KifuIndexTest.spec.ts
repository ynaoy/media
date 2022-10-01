import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import KifuIndex from "../../components/KifuIndex.vue"

describe("KifuIndex test", async() => {

  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { kifus_data, mock_func } = TestHelper()
  const wrapper = Mount( KifuIndex, { loginFlg: true, user_id: 1, csrf_token:"this is csrf_token" },
                                    { kifus: kifus_data()}) 

  // navigateToメソッドをモックする
  const spy_navigate = mock_func("navigateTo")

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<kifus-items")
  })

  it("ログインしていない時、リダイレクトされているかチェック", () => {
    const wrapper_not_login = Mount( KifuIndex, { loginFlg: false, user_id: 1 },
                                                { kifus: kifus_data()}) 
    expect(spy_navigate).toHaveBeenCalled()
  })

})