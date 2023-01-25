import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import UpdatePasswordResetModal from "../../components/password_resets/UpdatePasswordResetModal.vue"
import { PasswordResetHelper } from '../../composables/PasswordResetHelper'

describe("UpdatePasswordResetModal test", async() => {

  //コンポーネントにprovideするメソッドたち
  const { reset_status,get_validation, set_validation, reset_validation, valid_password,
          update_password_reset, set_reset_status }
      = PasswordResetHelper()
  
  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()

  let stub_template = { template:  `<div>
                                      <slot name="title"> </slot>
                                      <slot name="content"> </slot>
                                      <slot name="footer"> </slot>
                                    </div>`
                      }
  const wrapper = Mount(UpdatePasswordResetModal, {  csrf_token:"this is csrf_token", 
                                                    email: ref(""),
                                                    reset_token: ref(""),
                                                    reset_status: reset_status,
                                                    get_validation: get_validation,
                                                    reset_validation: reset_validation,
                                                    valid_password: valid_password,
                                                    update_password_reset: update_password_reset,
                                                    set_reset_status: set_reset_status },
                                                  { is_test:true },
                                                  { "Modal": stub_template },
                                                  {},
                                                  false
                                      )

  const { mock_func} = TestHelper(wrapper)

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
    expect(wrapper.find("#update_password").exists()).toBeTruthy()
    expect(wrapper.find("#update_password_confirmation").exists()).toBeTruthy()

    //フォームに値を入力してsubmitをクリック
    wrapper.find("#update_password").setValue("12345678")
    wrapper.find("#update_password_confirmation").setValue("12345678")
    wrapper.find("button[type='submit']").trigger('click')
    wrapper.vm.$nextTick()

    //フォームに正しく反映されているかチェック
    expect(wrapper.vm.update_form.password).toBe("12345678")
    expect(wrapper.vm.update_form.password_confirmation).toBe("12345678")

    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })

  it("validationが正しく動作しているかチェック", async() => {
    set_validation("パスワードが不正です")
    await wrapper.vm.$nextTick()
    //validationが表示されている
    expect(wrapper.text()).toContain("パスワードが不正です")
  })

  describe("watchが正しく動作しているかチェック",()=>{

    it("update_password_reset_flgがtrueになるとき", async() => {
      reset_status.value = "update_password_reset"
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.update_password_reset_flg).toBeTruthy()
    })

    it("update_password_reset_flgがfalseになるとき", async() => {
      reset_status.value = "falthy_flg"
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.update_password_reset_flg).toBeFalsy()
    })
  })
})