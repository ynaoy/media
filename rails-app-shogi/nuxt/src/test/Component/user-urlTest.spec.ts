import { describe, it, expect, vi, afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import UserUrl from "../../components/users/user-url.vue"

describe("User-url test", async() => {

  // $fetchメソッドをモックする。APIと通信するメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)

  // テストヘルパーの呼び出し
  const { Mount } = MountHelper()
  const { users_data } = TestHelper("")

  // コンポーネントのマウント
  const user = users_data(1)[0]
  const wrapper = Mount( UserUrl, { loginFlg: true,
                                    admin: true, 
                                    csrf_token:"this is csrf_token" },
                                    { user: user }) 

  it("ログイン時にテキストが正しく表示されているかチェック", () => {
    expect(wrapper.text()).toContain(user.name)
    expect(wrapper.text()).toContain("delete")
  })

  it("非ログイン時にテキストが正しく表示されているかチェック", () => {
    const wrapper_with_not_login = Mount( UserUrl, {  loginFlg: false,
                                                      admin: true, 
                                                      csrf_token:"this is csrf_token" },
                                                      { user: user })
    expect(wrapper_with_not_login.text()).toContain(user.name)
    expect(wrapper_with_not_login.text()).not.toContain("delete")
  })

  it("管理権限がない時にテキストが正しく表示されているかチェック", () => {
    const wrapper_with_not_admin = Mount( UserUrl, {  loginFlg: true,
                                                      admin: false, 
                                                      csrf_token:"this is csrf_token" },
                                                      { user: user })
    expect(wrapper_with_not_admin.text()).toContain(user.name)
    expect(wrapper_with_not_admin.text()).not.toContain("delete")
  })

  it("ユーザーを削除するボタンが正しく機能しているかチェック", async() => {
    const element = wrapper.find("#deleteUrl")
    expect(element.exists()).toBeTruthy()
    element.trigger('click')
    await wrapper.vm.$nextTick()
    expect(spy_fetch).toHaveBeenCalled()
  })

})