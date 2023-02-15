import { describe, it, expect,vi,afterAll, afterEach} from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import LoginForm from "../../components/LoginForm.vue"

describe("LoginForm test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(LoginForm,{ csrf_token:"this is csrf_token" })
  const { check_text, check_form, set_form, mock_func } = TestHelper(wrapper)
  // $fetchメソッドをモックする。APIと通信するメソッド内でこれが呼ばれたら成功
  const spy_fetch = mock_func("$fetch",{ data:"data" },true)

  afterAll(()=>{
    vi.clearAllMocks
  })

  afterEach(()=>{
    wrapper.vm.reset_all_validation()
  })

  it("テキストと子コンポーネントが正しく表示されているかチェック", async() => {
    const texts = ["ログイン", "メールアドレス", "パスワード"]
    check_text(texts)
    expect(wrapper.find("input[type='submit']").element.value).toBe("ログインする")
    expect(wrapper.html()).contain("<password-reset")
  })

  it("フォームが正しく動作しているかチェック", async() => {
    const forms = ["input[type='email']","input[type='password']"]
    const values = ['testuser@example.com','password']

    //フォームが存在するかチェック
    check_form(forms)

    //submit関数が呼び出されているかのチェック用
    const spy = await vi.spyOn(wrapper.vm,"submit")
    await wrapper.vm.$forceUpdate()

    //フォームに値を入力
    await set_form(forms,values)
    wrapper.find("input[type='submit']").trigger('click')
    await wrapper.vm.$nextTick()

    //フォームに正しく反映されているかチェック
    expect(wrapper.vm.session_form.email).toBe(values[0])
    expect(wrapper.vm.session_form.password).toBe(values[1])
    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })

  it("validationが正しく動作しているかチェック", async() => {
    const validations = [ 'メールアドレスを入力してください',
                          'パスワードを入力してください', 
                          'メールアドレスかパスワードに誤りがあります',]
    wrapper.vm.set_email_validation(validations[0])
    wrapper.vm.set_password_validation(validations[1])
    wrapper.vm.set_login_validation(validations[2])
    await wrapper.vm.$nextTick()
    
    // バリデーションが表示されているか
    check_text(validations)
  })
})