import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { KifuHelper } from "../../composables/KifuHelper"

describe("KifuHelper test", async() => {
  
  // $fetchメソッドをモックする。APIと通信するメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)

  //このテストでチェックするやつら
  const { get_kifu, create_kifu, delete_kifu, get_users_kifu } = KifuHelper()

  afterAll(()=>{
    vi.clearAllMocks()
  })
  afterEach(()=>{
    spy_fetch.mockClear()
  })

  it("get_kifuメソッドが正しく動作するかチェック", async() => {
    await get_kifu({id:1},{})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("create_kifuメソッドが正しく動作するかチェック", async() => {
    await create_kifu({ kifu:{  title:"",player1:"",player2:"",content:"",
                                tag:{ tag_ids:[] }}}, {})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("delete_kifuメソッドが正しく動作するかチェック", async() => {
    await delete_kifu({ id:1 }, {})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("get_users_kifuメソッドが正しく動作するかチェック", async() => {
    await get_users_kifu()
    expect(spy_fetch).toHaveBeenCalled()
  })
})