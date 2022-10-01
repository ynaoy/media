import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import UserShow from "../../components/UserShow.vue"

describe("UserShow test", async() => {

  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { user_and_kifus,mock_func } = TestHelper()
  const wrapper = Mount( UserShow,  { user_id: 1, csrf_token:"this is csrf_token" },
                                    { user_data:  user_and_kifus(1,"TestUser",60)}) 

  // navigateToメソッドをモックする
  const spy_navigate = mock_func("navigateTo")

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("自分のユーザーページの時にテキストが正しく表示されているかチェック", () => {
    expect(wrapper.text()).toContain("TestUser")
    expect(wrapper.text()).toContain("60件の棋譜")
    expect(wrapper.text()).toContain("[編集]")
    expect(wrapper.text()).not.toContain("このユーザーには棋譜がありません")
  })

  it("他人のユーザーページの時にテキストが正しく表示されているかチェック", () => {
    const wrapper_outher = Mount( UserShow, { user_id: 1, csrf_token:"this is csrf_token" },
                                            { user_data:  user_and_kifus(2,"TestUser",60)}) 
    expect(wrapper_outher.text()).toContain("TestUser")
    expect(wrapper_outher.text()).toContain("60件の棋譜")
    expect(wrapper_outher.text()).not.toContain("[編集]") // これが表示されない
    expect(wrapper.text()).not.toContain("このユーザーには棋譜がありません")
  })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<kifus-items")
  })

  it("Propsで与えられるuser_data['kifus']が空の時、子コンポーネントが表示されていないかチェック", () => {
    const wrapper_empty = Mount( UserShow,  { user_id: 1, csrf_token:"this is csrf_token" },
                                            { user_data:  user_and_kifus(1,"TestUser",0)}) 
    expect(wrapper_empty.text()).toContain("このユーザーには棋譜がありません")
  })

})