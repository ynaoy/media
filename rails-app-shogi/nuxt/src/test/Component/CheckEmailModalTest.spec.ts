import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import CheckEmailModal from "../../components/password_resets/CheckEmailModal.vue"
import { PasswordResetHelper } from '../../composables/PasswordResetHelper'

describe("CheckEmailModal test", async() => {

  //コンポーネントにprovideするメソッドたち
  const { reset_status, check_email_to_post, create_password_reset, update_password_reset, set_reset_status }
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
                                            reset_status: reset_status,
                                            check_email_to_post: check_email_to_post,
                                            create_password_reset: create_password_reset,
                                            update_password_reset: update_password_reset, 
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
    console.log(wrapper.html())
    //submit関数が呼び出されているかのチェック用
    const spy = await vi.spyOn(wrapper.vm,"submit")
    wrapper.vm.$forceUpdate()

    //フォームが存在するかチェック
    expect(wrapper.find("input[type='text']").exists()).toBeTruthy()

    //フォームに値を入力してsubmitをクリック
    wrapper.find("input[type='text']").setValue("test@example.com")
    wrapper.find("button[type='submit']").trigger('click')
    wrapper.vm.$nextTick()

    //フォームに正しく反映されているかチェック
    expect(wrapper.vm.email).toBe("test@example.com")

    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })
})