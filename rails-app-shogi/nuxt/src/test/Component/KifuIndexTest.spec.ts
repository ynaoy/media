import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import KifuIndex from "../../components/KifuIndex.vue"

describe("KifuIndex test", async() => {

  // nuxt独自のメソッドnavigateToをモックする。force_login(false)メソッド内でこれが呼ばれたら成功
  const spy_navigate = vi.fn()
  vi.stubGlobal("navigateTo", spy_navigate)

  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { kifus_data } = TestHelper("")
  const wrapper = Mount( KifuIndex, { loginFlg: true, user_id: 1, csrf_token:"this is csrf_token" },
                                    { kifus: kifus_data()}) 

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<pagination")
    expect(wrapper.html()).toContain("<kifu-items")
  })

  it("Propsのkifusが空の時、子コンポーネントが表示されていないかチェック", () => {
    const wrapper_empty = Mount( KifuIndex, { loginFlg: true, user_id: 1 },
                                            { kifus: []}) 
    expect(wrapper_empty.html()).not.toContain("<kifu-items")
  })

  it("ログインしていない時、リダイレクトされているかチェック", () => {
    const wrapper_not_login = Mount( KifuIndex, { loginFlg: false, user_id: 1 },
                                                { kifus: kifus_data()}) 
    expect(spy_navigate).toHaveBeenCalled()
  })

})