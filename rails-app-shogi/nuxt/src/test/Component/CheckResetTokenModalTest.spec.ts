import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import CheckResetTokenModal from "../../components/password_resets/CheckResetTokenModal.vue"
import { PasswordResetHelper } from '../../composables/PasswordResetHelper'

describe("CheckResetTokenModal test", async() => {

  //コンポーネントにprovideするメソッドたち
  const { reset_status, check_token, set_reset_status }
      = PasswordResetHelper()
  
  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()

  let stub_template = { template:  `<div>
                                      <slot name="title"> </slot>
                                      <slot name="content"> </slot>
                                      <slot name="footer"> </slot>
                                    </div>`
                      }
  const wrapper = Mount(CheckResetTokenModal,  {  csrf_token:"this is csrf_token", 
                                                  email: ref(""),
                                                  reset_token: ref(""),
                                                  reset_status: reset_status,
                                                  check_token: check_token,
                                                  set_reset_status: set_reset_status },
                                              { is_test:true },
                                              { "Modal": stub_template },
                                              {},
                                              false
                                      )

  const { check_text, mock_func} = TestHelper(wrapper)

  // $fetchメソッドをモックする。
  const spy_fetch = mock_func("$fetch",{ data:"data" },true)

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("フォームが正しく動作しているかチェック", async() => {
    //submit関数が呼び出されているかのチェック用
    const spy = await vi.spyOn(wrapper.vm,"submit")
    wrapper.vm.$forceUpdate()

    //フォームが存在するかチェック
    expect(wrapper.find("input[type='text']").exists()).toBeTruthy()

    //フォームに値を入力してsubmitをクリック
    wrapper.find("input[type='text']").setValue("12345678")
    wrapper.find("button[type='submit']").trigger('click')
    wrapper.vm.$nextTick()

    //フォームに正しく反映されているかチェック
    expect(wrapper.vm.reset_token).toBe("12345678")

    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })

  describe("watchが正しく動作しているかチェック",()=>{

    it("check_reset_token_flgがtrueになるとき", async() => {
      reset_status.value = "check_token"
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.check_reset_token_flg).toBeTruthy()
    })

    it("check_reset_token_flgがfalseになるとき", async() => {
      reset_status.value = "falthy_flg"
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.check_reset_token_flg).toBeFalsy()
    })
  })
})