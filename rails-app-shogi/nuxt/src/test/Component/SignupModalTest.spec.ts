import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import SignupModal from "../../components/SignupModal.vue"

describe("SignupModal test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()

  let stub_template = { template:  `<div>
                                      <slot name="title"> </slot>
                                      <slot name="content"> </slot>
                                      <slot name="footer"> </slot>
                                    </div>`
                      }
  const wrapper = Mount(SignupModal,  { csrf_token:"this is csrf_token", 
                                        email: ref("test@example.com"),
                                        user_created_flg: ref(true)},
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
    wrapper.find("input[type='text']").setValue("12345678")
    wrapper.find("button[type='submit']").trigger('click')
    wrapper.vm.$nextTick()

    //フォームに正しく反映されているかチェック
    expect(wrapper.vm.activation_token).toBe("12345678")

    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })
})