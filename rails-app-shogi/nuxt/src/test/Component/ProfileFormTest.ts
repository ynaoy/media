import { describe, it, expect,vi,afterAll, beforeAll } from 'vitest'
import { mount,shallowMount } from "@vue/test-utils";
import { TestHelper } from "../TestHelper"
import ProfileForm from "../../components/ProfileForm.vue";

export default async function ProfileFormTest(){
  //テストメソッド内で使われるHelperをモック、コンポーネントをマウント、テストヘルパーの呼び出し
  vi.stubGlobal("UserHelper",vi.fn().mockReturnValue({ "update_user":vi.fn() }))
  const wrapper = await shallowMount(ProfileForm)
  const { check_text, check_form, set_form } = TestHelper(wrapper)

  describe("ProfileForm test", async() => {

    afterAll(()=>{
      vi.clearAllMocks
    })

    it("テキストが正しく表示されているかチェック", async() => {
      check_text(["ユーザー編集","ユーザー名"])
      expect(wrapper.find("input[type='submit']").element.value).toBe("編集")
    })

    it("フォームが正しく動作しているかチェック", async() => {
      const forms = ["input[type='text']",]
      const values = ['TestUser',]

      //submit関数が呼び出されているかのチェック用
      const spy = await vi.spyOn(wrapper.vm,"submit")
      await wrapper.vm.$forceUpdate()

      //フォームが存在するかチェック
      check_form(forms)

      //フォームに値を入力
      await set_form(forms,values)
      wrapper.find("input[type='submit']").trigger('click')
      await wrapper.vm.$nextTick()

      //フォームに正しく反映されているかチェック
      expect(wrapper.vm.update_form.name).toBe(values[0])
      //submit関数が呼び出されているかチェックする
      expect(spy).toHaveBeenCalled()
      spy.mockReset()
    })
  })
}