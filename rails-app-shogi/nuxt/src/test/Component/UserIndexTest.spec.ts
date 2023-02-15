import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import UserIndex from "../../components/UserIndex.vue"

describe("UserIndex test", async() => {

  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { users_data,mock_func } = TestHelper()
  const wrapper = Mount( UserIndex, { loginFlg: true, admin: true, csrf_token:"this is csrf_token" },
                                    { users: users_data()}) 
  // navigateToメソッドをモックする
  const spy_navigate = mock_func("navigateTo")
  afterAll(()=>{
    vi.clearAllMocks
  })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<pagination")
    expect(wrapper.html()).toContain("<user-items")
  })

  it("Propsのusersが空の時、子コンポーネントが表示されていないかチェック", () => {
    const wrapper_empty = Mount( UserIndex, { loginFlg: true, admin: true, csrf_token:"this is csrf_token" },
                                            { users: []}) 
    expect(wrapper_empty.html()).not.toContain("<user-items")
  })

  it("ログインしていない時、リダイレクトされているかチェック", () => {
    const wrapper_not_login = Mount( UserIndex, { loginFlg: false, 
                                                  admin: true, 
                                                  csrf_token:"this is csrf_token" },
                                                { users: users_data()}) 
    expect(spy_navigate).toHaveBeenCalled()
  })

})