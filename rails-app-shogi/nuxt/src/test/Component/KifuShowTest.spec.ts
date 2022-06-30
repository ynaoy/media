import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper } from "../TestHelper"
import KifuShow from "../../components/KifuShow.vue"

describe("KifuShow test", async() => {

  //get_kifu関数が呼び出されているかのチェック用
  const spy = vi.fn().mockResolvedValue({ kifu_data:{ 
    kifu_text: [1,2,3], kifu_flg: [1,2,3],
    favorite_flg: true, kifu_id: 1,
    player1:"player1",player2:"player2"} })

  //テストメソッド内で使われるHelperをモック
  vi.stubGlobal("KifuHelper",vi.fn().mockReturnValue({ "get_kifu": spy}))

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(KifuShow,{  csrf_token:"this is csrf_token",
                                    loginFlg:false },
                                  { id:1 })

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("APIと通信するメソッドget_kifuが呼び出されているかチェック", async() => {
    expect(spy).toHaveBeenCalled()
    spy.mockReset()
  })
})