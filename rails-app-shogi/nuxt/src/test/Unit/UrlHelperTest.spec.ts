import { describe, it, expect,vi, afterAll} from 'vitest'
import { TestHelper } from "../TestHelper"
import { UrlHelper } from "../../composables/UrlHelper";

describe("UrlHelper test", async() => {

  //テストヘルパーの呼び出し
  const { mock_func } = TestHelper()
  // $fetchメソッドをモックする
  const spy_fetch = mock_func("$fetch",{ data:"data" })

  //このテストでチェックするやつ
  const { FetchResponse } = UrlHelper()
  
  afterAll(()=>{
    vi.clearAllMocks()
  })

  it("FetchResponseメソッドが正しく動作するかチェック", async() => {
    expect(FetchResponse("",{})["data"]).toBe("data")
  })
})