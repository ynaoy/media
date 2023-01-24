import { describe, it, expect, vi, afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import CheckEmailModal from "../../components/password_resets/CheckEmailModal.vue"
import { PasswordResetHelper } from '../../composables/PasswordResetHelper'

describe("CheckEmailModal test", async() => {

  //コンポーネントにprovideするメソッドたち
  const { reset_status, validation, check_email_to_post, set_reset_status, reset_validation }
      = PasswordResetHelper()
  
  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()

  let stub_template = { template:  `<div>
                                      <slot name="title"> </slot>
                                      <slot name="content"> </slot>
                                      <slot name="footer"> </slot>
                                    </div>`
                      }
  const wrapper = Mount(CheckEmailModal,  { csrf_token:"this is csrf_token", 
                                            email: ref(""),
                                            reset_status: reset_status,
                                            validation: validation,
                                            check_email_to_post: check_email_to_post,
                                            set_reset_status: set_reset_status,
                                            reset_validation: reset_validation},
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
  afterEach(()=>{
    spy_fetch.mockClear()
  })

  it("フォームが正しく動作しているかチェック", async() => {
    //submit関数が呼び出されているかのチェック用
    const spy = await vi.spyOn(wrapper.vm,"submit")
    wrapper.vm.$forceUpdate()

    //フォームが存在するかチェック
    expect(wrapper.find("input[type='text']").exists()).toBeTruthy()

    //フォームに値を入力してsubmitをクリック
    wrapper.find("input[type='text']").setValue("test@example.com")
    wrapper.find("button[type='submit']").trigger('click')
    await wrapper.vm.$nextTick()

    //フォームに正しく反映されているかチェック
    expect(wrapper.vm.email).toBe("test@example.com")

    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })

  it("validationが正しく動作しているかチェック", async() => {
    validation.value = "ユーザーが存在しません"
    await wrapper.vm.$nextTick()
    //validationが表示されている
    expect(wrapper.text()).toContain("ユーザーが存在しません")
  })

  describe("watchが正しく動作しているかチェック",()=>{

    it("check_email_flgがtrueになるとき", async() => {
      reset_status.value = "check_email"
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.check_email_flg).toBeTruthy()
    })

    it("check_email_flgがfalseになるとき", async() => {
      reset_status.value = "falthy_flg"
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.check_email_flg).toBeFalsy()
    })
  })
})