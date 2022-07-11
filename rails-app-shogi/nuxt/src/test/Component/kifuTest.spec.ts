import { describe, it, expect,vi, afterEach} from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import kifu from "../../components/kifus/kifu.vue"

describe("kifu test", async() => {

  // $fetchメソッドをモックする。APIと通信するメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { kifu_data } = TestHelper("")
  const { Mount } = MountHelper()
  const wrapper = Mount(kifu, { csrf_token: "this is csrf_token", loginFlg: true},
                              { kifu_data: kifu_data()},
                              )

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).contain("<board")
    expect(wrapper.html()).contain("<favorite")
    expect(wrapper.html()).contain("<admin")
  })
})