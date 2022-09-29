import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { SearchHelper } from "../../composables/SearchHelper";

describe("SearchHelper test", async() => {

  // $fetchメソッドをモックする。search_user_and_kifuメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)
  //  "is not defined" エラー回避のためuseRouterメソッドをモックする。
  vi.stubGlobal("useRouter", vi.fn().mockReturnValue({ push: vi.fn() }))
   //このテストでチェックするやつら
  const { search_user_and_kifu } =  SearchHelper()

  afterAll(()=>{
    vi.clearAllMocks()
  })
  afterEach(()=>{
    spy_fetch.mockClear()
  })

  it("search_user_and_kifuメソッドが正しく動作するかチェック", async() => {
    await search_user_and_kifu( { query:"TestUser"}, {})
    expect(spy_fetch).toHaveBeenCalled()
  })

})