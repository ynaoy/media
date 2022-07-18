import { describe, it, expect } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import KifusItems from "../../components/kifus/kifus-items.vue"

describe("Kifus-items test", async() => {

  // テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const { kifus_data } = TestHelper("")
  const wrapper = Mount( KifusItems, { loginFlg: true, user_id: 1, csrf_token:"this is csrf_token" },
                                    { kifus: kifus_data()}) 

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<pagination")
    expect(wrapper.html()).toContain("<kifu-items")
  })

  it("Propsのkifusが空の時、子コンポーネントが表示されていないかチェック", () => {
    const wrapper_empty = Mount( KifusItems, { loginFlg: true, user_id: 1 },
                                            { kifus: []}) 
    expect(wrapper_empty.html()).not.toContain("<kifu-items")
  })

})