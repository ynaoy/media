import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import UserItems from "../../components/users/user-items.vue"

describe("user-items test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { users_data } = TestHelper("")
  const wrapper = Mount( UserItems, { loginFlg: true, admin: true, csrf_token:"this is csrf_token" },
                                    { users: users_data(60)}) 
  
  it("v-forが正しく機能して子コンポーネントの表示件数をチェック", () => {
    expect(wrapper.html().match(new RegExp("<user-url",'g')).length).toBe(60)
  })
})