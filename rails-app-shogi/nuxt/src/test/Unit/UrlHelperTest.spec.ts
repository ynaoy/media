import { describe, it, expect,vi, afterAll} from 'vitest'
import { UrlHelper } from "../../composables/UrlHelper";

describe("UrlHelper test", async() => {

  vi.stubGlobal("$fetch",vi.fn().mockReturnValue( { data:"data" }))
  //このテストでチェックするやつ
  const { FetchResponse } = UrlHelper()
  
  afterAll(()=>{
    vi.clearAllMocks()
  })

  it("FetchResponseメソッドが正しく動作するかチェック", async() => {
    expect(FetchResponse("",{})["data"]).toBe("data")
  })
})