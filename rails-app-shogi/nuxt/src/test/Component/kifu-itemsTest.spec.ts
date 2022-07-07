import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import KifuItems from "../../components/kifus/kifu-items.vue"

describe("kifu-items test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { kifus_data } = TestHelper("")
  const wrapper = Mount( KifuItems, { user_id: 1 },
                                    { kifus: kifus_data(60)}) 
  
  it("v-forが正しく機能して子コンポーネントの表示件数をチェック", () => {
    expect(wrapper.html().match(new RegExp("<kifu-url",'g')).length).toBe(60)
  })
})
