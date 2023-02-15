import { describe, it, expect, vi, afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import SignupForm from "../../components/SignupForm.vue"

describe("SignupForm test", async() => {

  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(SignupForm, { csrf_token:"this is csrf_token" })
  const { check_text, check_form, set_form, mock_func} = TestHelper(wrapper)

  // $fetchメソッドをモックする
  const spy_fetch = mock_func("$fetch",{ data:"data" },true)

  // テスト時に使うformのinput属性と、フォームに入れる値
  const forms = [ "input[type='text']",
                  "input[type='email']",
                  "input[type='password']",
                  "input[name='user[password_confirmation]']"]
  const values = ['TestUser','testuser@example.com','password','password']


  afterAll(()=>{
    vi.clearAllMocks
  })

  afterEach(()=>{
    wrapper.vm.reset_all_validation()
  })
    
  it("テキストが正しく表示されているかチェック", async() => {
    check_text(["ユーザー登録",
                "ユーザー名",
                "メールアドレス",
                "パスワード",
                "パスワードの確認"])
    expect(wrapper.find("input[type='submit']").element.value).toBe("作成")
  })

  it("フォームが正しく動作しているかチェック", async() => {

    // submit関数が呼び出されているかのチェック用
    const spy = await vi.spyOn(wrapper.vm,"submit")
    await wrapper.vm.$forceUpdate()

    // フォームが存在するかチェック
    check_form(forms)

    // フォームに値を入力
    await set_form(forms,values)

    // サブミットボタンを押す
    wrapper.find("input[type='submit']").trigger('click')
    await wrapper.vm.$nextTick()

    //フォームに正しく反映されているかチェック
    expect(wrapper.vm.signup_form.name).toBe(values[0])
    expect(wrapper.vm.signup_form.email).toBe(values[1])
    expect(wrapper.vm.signup_form.password).toBe(values[2])
    expect(wrapper.vm.signup_form.password_confirmation).toBe(values[3])
    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })

  it("validationが正しく動作しているかチェック", async() => {
    const validations = [ 'メールアドレスを入力してください',
                          'ユーザー名を入力してください',
                          'パスワードを入力してください', ]
    wrapper.vm.set_email_validation(validations[0])
    wrapper.vm.set_user_name_validation(validations[1])
    wrapper.vm.set_password_validation(validations[2])
    await wrapper.vm.$nextTick()
    
    // バリデーションが表示されているか
    check_text(validations)
  })
})
