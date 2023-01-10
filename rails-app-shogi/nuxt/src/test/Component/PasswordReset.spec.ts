import { describe, it, expect, vi} from 'vitest'
import { MountHelper } from "../TestHelper"
import PasswordReset from "../../components/PasswordReset.vue"

describe("PasswordReset test", async() => {

  //テストヘルパーの呼び出しとコンポーネントをマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(PasswordReset,{ csrf_token:"this is csrf token" },{},{},
                                      { default: "<p> this is slot </p>"})

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).contain("<check-email")
  })

  it("slotをクリックしたときにreset_statusの値が更新されているか", async() => {
    wrapper.find(".password_reset_slot").trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.reset_status).toBe("check_email")
  })
})