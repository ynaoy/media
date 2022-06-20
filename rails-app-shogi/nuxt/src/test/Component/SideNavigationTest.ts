import { describe, it, expect } from 'vitest'
import { mount,shallowMount } from "@vue/test-utils";
import { TestHelper } from "../TestHelper"
import SideNavigation from "../../components/SideNavigation.vue";

export default async function SideNavigationTest(){
  //コンポーネントをマウント、テストヘルパーの呼び出し
  const wrapper = await shallowMount(SideNavigation)
  const { check_text } = TestHelper(wrapper)

  describe("SideNavigation test", async() => {

    const tags = ["相掛かり","矢倉","角換わり","横歩取り",
                  "三間飛車","四間飛車","角交換四間飛車","角交換中飛車"]
    it("ログインしてない時にテキストが正しく表示されているかチェック", async() => {
      check_text(["好みの棋譜を探す"])
      check_text(tags)
    })

    it("ログインしてる時にテキストが正しく表示されているかチェック", async() => {
      await (wrapper.vm.loginFlg = true)
      await (wrapper.vm.user_name = "TestUser")

      check_text(["好みの棋譜を探す"])
      check_text(tags)
      check_text(['マイページ','お気に入り','棋譜を追加','閲覧履歴'])
    })
  })
}