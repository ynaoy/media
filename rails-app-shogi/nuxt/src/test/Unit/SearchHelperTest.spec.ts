import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { SearchHelper } from "../../composables/SearchHelper";

describe("SearchHelper test", async() => {
  const { mock_func } = TestHelper()

  // $fetchメソッドをモックする。search_user_and_kifuメソッド内でこれが呼ばれたら成功
  const spy_fetch = mock_func("$fetch",{ data:"data" },true)
  
  //  "is not defined" エラー回避のためuseRouterメソッドをモックする。
  mock_func("useRouter",{ push: vi.fn() })
  
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