import { describe, it, expect,vi,afterAll, beforeAll} from 'vitest'
import { mount,shallowMount } from "@vue/test-utils";
import { TestHelper } from "../TestHelper"
import LoginForm from "../../components/LoginForm.vue";

describe("LoginForm test", async() => {

  //テストメソッド内で使われるHelperをモック、コンポーネントをマウント、テストヘルパーの呼び出し
  vi.stubGlobal("SessionHelper",vi.fn().mockReturnValue({ "login": vi.fn()}))
  const wrapper = await shallowMount(LoginForm)
  const { check_text, check_form, set_form } = TestHelper(wrapper)

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("テキストが正しく表示されているかチェック", async() => {
    const texts = ["ログイン", "メールアドレス", "パスワード"]
    check_text(texts)
    expect(wrapper.find("input[type='submit']").element.value).toBe("ログインする")
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
})