import { describe, it, expect } from 'vitest'
import { mount,shallowMount } from "@vue/test-utils";
import { TestHelper } from "../TestHelper"
import NavBar from "../../components/NavBar.vue";

export default async function NavBarTest(){
  const wrapper = await shallowMount(NavBar)
  const { check_text, check_form } = TestHelper(wrapper)

  describe("NavBar test", async() => {

    it("ログインしてない時にテキストが正しく表示されているかチェック", async() => {
      check_text(['将棋のお時間','ログイン','新規登録'])
      check_form(["input[type='text']"])
      expect(wrapper.find("input[type='submit']").element.value).toBe("検索")
    })

    it("ログイン時にテキストが正しく表示されているかチェック", async() => {
      await (wrapper.vm.loginFlg = true)
      await (wrapper.vm.user_name = "TestUser")
      
      check_text(['将棋のお時間','Log out','Setting'])
      check_form(["input[type='text']"])
      
      expect(wrapper.find("input[type='submit']").element.value).toBe("検索")
      expect(wrapper.text()).not.toContain('ログイン')
    })
    it("ログイン時にドロップダウンが正しく動作しているか",async()=>{
      //----------------------------------------------------------------------
      //bootstrap-vue-3はクライアント上でしか動作しないため、ユニットテストができない
      //解決法思いついたらテスト追加する
      //----------------------------------------------------------------------

      //await (wrapper.vm.loginFlg = true)
      //ドロップダウンが存在するかの確認。
      //ドロップダウンクリック後、機能しているかを"aria-expanded"属性を元にチェック
      //expect(wrapper.find(".dropdown").exists()).toBeTruthy()
      //expect(wrapper.find(".dropdown-toggle").exists()).toBeTruthy()
      //expect(wrapper.find(".dropdown-toggle").aria-expanded).toBeFalsy()
      //wrapper.find(".dropdown-toggle").trigger('click')
      //expect(wrapper.find(".dropdown-toggle").aria-expanded).toBeTruthy()
    })
  })
}