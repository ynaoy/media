import { describe, it, expect,vi, beforeAll } from 'vitest'
import { mount,shallowMount } from "@vue/test-utils";
import SideNavigation from "../../components/SideNavigation.vue";

export default async function SideNavigationTest(){
  describe("SideNavigation test", async() => {

    //for文で表示されてるかテストする
    const tags = ["相掛かり","矢倉","角換わり","横歩取り",
                  "三間飛車","四間飛車","角交換四間飛車","角交換中飛車"]

    it("display text not loged in", async() => {
      //-----------------------------
      //ログインしてない時にテキストが正しく表示されているかチェック
      //-----------------------------
      const wrapper = await shallowMount(SideNavigation)
      expect(wrapper.text()).toContain("好みの棋譜を探す")
      for (let i in tags){
        expect(wrapper.text()).toContain(tags[i])
      }
    })

    it("display text loged in", async() => {
      //-----------------------------
      //ログイン時にテキストが正しく表示されているかチェック
      //-----------------------------
      const wrapper = await shallowMount(SideNavigation)
      await (wrapper.vm.loginFlg = true)
      await (wrapper.vm.user_name = "TestUser")

      expect(wrapper.text()).toContain("好みの棋譜を探す")
      for (let i in tags){
        expect(wrapper.text()).toContain(tags[i])
      }
      expect(wrapper.text()).toContain('マイページ')
      expect(wrapper.text()).toContain('お気に入り')
      expect(wrapper.text()).toContain('棋譜を追加')
      expect(wrapper.text()).toContain('閲覧履歴')
    })
  })
}