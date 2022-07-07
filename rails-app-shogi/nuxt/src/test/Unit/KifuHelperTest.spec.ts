import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { KifuHelper } from "../../composables/KifuHelper"

describe("KifuHelper test", async() => {

  //UrlHelperのFetchResponseメソッドをモックする。テストメソッド内でこれが呼ばれたら成功
  const spy = vi.fn().mockReturnValue( Promise.resolve( { kifu_data:"kifu_data" } ))
  vi.stubGlobal("UrlHelper",vi.fn().mockReturnValue( 
    { FetchResponse: spy }
  ))

  //このテストでチェックするやつら
  const { get_kifu, create_kifu, get_users_kifu } = KifuHelper()

  afterAll(()=>{
    vi.clearAllMocks()
  })
  afterEach(()=>{
    spy.mockClear()
  })

  it("get_kifuメソッドが正しく動作するかチェック", async() => {
    await get_kifu({id:1},{})
    expect(spy).toHaveBeenCalled()
  })

  it("create_kifuメソッドが正しく動作するかチェック", async() => {
    await create_kifu({ kifu:{  title:"",player1:"",player2:"",content:"",
                                tag:{ tag_ids:[] }}}, {})
    expect(spy).toHaveBeenCalled()
  })

  it("get_users_kifuメソッドが正しく動作するかチェック", async() => {
    await get_users_kifu()
    expect(spy).toHaveBeenCalled()
  })
})