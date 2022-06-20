import { describe, it, expect,vi, afterAll} from 'vitest'
import { UrlHelper } from "../../composables/UrlHelper";

export default async function UrlHelperTest(){

  vi.stubGlobal("$fetch",vi.fn().mockReturnValue( { data:"data" }))
  //このテストでチェックするやつ
  const { FetchResponse } = UrlHelper()
  
  afterAll(()=>{
    vi.clearAllMocks()
  })
  
  describe("UrlHelper test", async() => {
    it("FetchResponseメソッドが正しく動作するかチェック", async() => {
      expect(FetchResponse("",{})["data"]).toBe("data")
    })
  })
}