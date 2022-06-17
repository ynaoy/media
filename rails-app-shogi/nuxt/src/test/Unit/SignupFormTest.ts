import { describe, it, expect,vi} from 'vitest'
import { mount,shallowMount } from "@vue/test-utils";
import { TestHelper } from "../TestHelper"
import SignupForm from "../../components/SignupForm.vue";

export default async function SignupFormTest(){
  const wrapper = await shallowMount(SignupForm)
  const { check_text, check_form, set_form } = TestHelper(wrapper)

  describe("SignupForm test", async() => {

    it("テキストが正しく表示されているかチェック", async() => {
      check_text(["ユーザー登録",
                  "ユーザー名",
                  "メールアドレス",
                  "パスワード",
                  "パスワードの確認"])
      expect(wrapper.find("input[type='submit']").element.value).toBe("作成")
    })

    it("フォームが正しく動作しているかチェック", async() => {
      const forms = ["input[type='text']",
                      "input[type='email']",
                      "input[type='password']",
                      "input[name='user[password_confirmation]']"]
      const values = ['TestUser','testuser@example.com','password','password']


      //submit関数が呼び出されているかのチェック用
      const spy = await vi.spyOn(wrapper.vm,"submit")
      await wrapper.vm.$forceUpdate()

      //フォームが存在するかチェック
      check_form(forms)
      expect(wrapper.find("input[name='user[password_confirmation]']").exists()).toBeTruthy()

      //フォームに値を入力
      await set_form(forms,values)
      wrapper.find("input[type='submit']").trigger('click')
      await wrapper.vm.$nextTick()

      //フォームに正しく反映されているかチェック
      expect(wrapper.vm.signup_form.name).toBe(values[0])
      expect(wrapper.vm.signup_form.email).toBe(values[1])
      expect(wrapper.vm.signup_form.password).toBe(values[2])
      expect(wrapper.vm.signup_form.password_confirmation).toBe(values[3])
      expect(spy).toHaveBeenCalled()
      spy.mockReset()
    })
  })
}