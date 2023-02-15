import { describe, it, expect,vi, afterEach} from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import kifu from "../../components/kifus/kifu.vue"

describe("kifu test", async() => {

    //テストヘルパーの呼び出しとコンポーネントのマウント
    const { kifu_data,mock_func } = TestHelper("")
    const { Mount } = MountHelper()
    const wrapper = Mount(kifu, { csrf_token: "this is csrf_token", loginFlg: true},
                                { kifu_data: kifu_data()},
                                )

  // $fetchメソッドをモックする。
  const spy_fetch = mock_func("$fetch",{ data:"data" },true)

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).contain("<board")
    expect(wrapper.html()).contain("<favorite")
    expect(wrapper.html()).contain("<admin")
  })
})