import { describe, it, expect,vi } from 'vitest'
import { mount,shallowMount } from "@vue/test-utils";
import NavBar from "../../components/NavBar.vue";

export default async function NavBarTest(){
  describe("NavBar test", async() => {
    it("display text not loged in", async() => {
      //-----------------------------
      //ログインしてない時にテキストが正しく表示されているかチェック
      //-----------------------------
      const wrapper = await shallowMount(NavBar)

      expect(wrapper.text()).toContain('将棋のお時間')
      expect(wrapper.find("input[type='text']").exists()).toBeTruthy()
      expect(wrapper.find("input[type='submit']").element.value).toBe("検索")
      expect(wrapper.text()).toContain('ログイン')
      expect(wrapper.text()).toContain('新規登録')
    })

    it("display text loged in", async() => {
      //-----------------------------
      //ログイン時にテキストが正しく表示されているかチェック
      //-----------------------------
      const wrapper = await shallowMount(NavBar)
      await (wrapper.vm.loginFlg = true)
      await (wrapper.vm.user_name = "TestUser")

      expect(wrapper.text()).toContain('将棋のお時間')
      expect(wrapper.find("input[type='text']").exists()).toBeTruthy()
      expect(wrapper.find("input[type='submit']").element.value).toBe("検索")
      expect(wrapper.get(".dropdown-toggle").text()).toContain("TestUser")
      expect(wrapper.text()).toContain('Log out')
      expect(wrapper.text()).toContain('Setting')
      expect(wrapper.text()).not.toContain('ログイン')
    })
  })
}