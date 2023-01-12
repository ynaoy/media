import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import CreatePasswordResetModal from "../../components/password_resets/CreatePasswordResetModal.vue"
import { PasswordResetHelper } from '../../composables/PasswordResetHelper'

describe("CreatePasswordResetModal test", async() => {

  //コンポーネントにprovideするメソッドたち
  const { reset_status, create_password_reset, update_password_reset, set_reset_status }
      = PasswordResetHelper()
  
  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()

  let stub_template = { template:  `<div>
                                      <slot name="title"> </slot>
                                      <slot name="content"> </slot>
                                      <slot name="footer"> </slot>
                                    </div>`
                      }
  const wrapper = Mount(CreatePasswordResetModal,  
                                          { csrf_token:"this is csrf_token", 
                                            reset_status: reset_status,
                                            create_password_reset: create_password_reset,
                                            update_password_reset: update_password_reset, 
                                            set_reset_status: set_reset_status,
                                            email: ref("test@example.com") },
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

  it("サブミットボタンが正しく動作しているかチェック", async() => {
    //submit関数が呼び出されているかのチェック用
    const spy = await vi.spyOn(wrapper.vm,"submit")
    wrapper.vm.$forceUpdate()

    //submitをクリック
    wrapper.find("button[type='submit']").trigger('click')
    wrapper.vm.$nextTick()

    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })

  describe("watchが正しく動作しているかチェック",()=>{

    it("password_reset_flg_flgがtrueになるとき", async() => {
      wrapper.vm.reset_status = "create_password_reset"
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.password_reset_flg).toBeTruthy()
    })

    it("password_reset_flg_flgがfalseになるとき", async() => {
      wrapper.vm.reset_status = "falthy_flg"
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.password_reset_flg).toBeFalsy()
    })
  })
  
})