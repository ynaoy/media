import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper, TestHelper } from "../TestHelper"
import KifuShow from "../../components/KifuShow.vue"

describe("KifuShow test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { kifu_data } = TestHelper("")
  const wrapper = Mount(KifuShow,{  csrf_token:"this is csrf_token",
                                    loginFlg:false },
                                  { kifu_data: kifu_data() })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<kifu")
    expect(wrapper.html()).toContain("<kifu-tag")
  })

})