import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper } from "../TestHelper"
import KifuShow from "../../components/KifuShow.vue"

describe("KifuShow test", async() => {

  // $fetchメソッドをモックする。APIと通信するメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(KifuShow,{  csrf_token:"this is csrf_token",
                                    loginFlg:false },
                                  { id:1 })

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("APIと通信するメソッドget_kifuが呼び出されているかチェック", async() => {
    expect(spy_fetch).toHaveBeenCalled()
    spy_fetch.mockReset()
  })
})