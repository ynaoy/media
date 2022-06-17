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
      
      check_text(['将棋のお時間','TestUser','Log out','Setting'])
      check_form(["input[type='text']"])
      expect(wrapper.find("input[type='submit']").element.value).toBe("検索")
      expect(wrapper.text()).not.toContain('ログイン')
    })
  })
}