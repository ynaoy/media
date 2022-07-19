import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { SearchHelper } from "../../composables/SearchHelper";

describe("SearchHelper test", async() => {

  // $fetchメソッドをモックする。login、logoutメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)

   //このテストでチェックするやつら
  const {  search_user_and_kifu } =  SearchHelper()

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