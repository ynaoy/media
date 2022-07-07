import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import KifuIndex from "../../components/KifuIndex.vue"

describe("KifuIndex test", async() => {

  //テストメソッド内で使われるHelperをモック
  const spy_force_login = vi.fn()
  vi.stubGlobal("SessionHelper",vi.fn().mockReturnValue({ "force_login": spy_force_login}))

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { kifus_data } = TestHelper("")
  const wrapper = Mount( KifuIndex, { loginFlg: true, user_id: 1 },
                                    { kifus: kifus_data()}) 

  // kifus_is_emptyメソッドが呼び出されているかの確認用
  const spy_kifus_is_empty = vi.spyOn(wrapper.vm, "kifus_is_empty")
  await wrapper.vm.$forceUpdate()

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<kifu-items")
  })

  it("kifusが空の時、子コンポーネントが表示されていないかチェック", () => {
    const wrapper_empty = Mount( KifuIndex, { loginFlg: true, user_id: 1 },
                                            { kifus: []}) 
    expect(wrapper_empty.html()).not.toContain("<kifu-items")
  })

  it("マウント時にメソッドが呼び出されているかチェック", () => {
    expect(spy_force_login).toHaveBeenCalled()
    expect(spy_kifus_is_empty).toHaveBeenCalled()
  })

})