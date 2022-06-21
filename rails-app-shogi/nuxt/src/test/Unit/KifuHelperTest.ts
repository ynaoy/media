import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { KifuHelper } from "../../composables/KifuHelper"

export default async function KifuHelperTest(){

  //UrlHelperのFetchResponseメソッドをモックする。テストメソッド内でこれが呼ばれたら成功
  const spy = vi.fn().mockReturnValue( Promise.resolve( { kifu_data:"kifu_data" } ))
  vi.stubGlobal("UrlHelper",vi.fn().mockReturnValue( 
    { FetchResponse: spy }
  ))
  //このテストでチェックするやつら
  const { get_kifu } = KifuHelper()
  
  describe("KifuHelper test", async() => {

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

  })
}