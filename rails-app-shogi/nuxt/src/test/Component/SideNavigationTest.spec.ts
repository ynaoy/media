import { describe, it, expect } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import SideNavigation from "../../components/SideNavigation.vue"

describe("SideNavigation test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(SideNavigation,{ loginFlg:false })
  const { check_text} = TestHelper(wrapper)

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