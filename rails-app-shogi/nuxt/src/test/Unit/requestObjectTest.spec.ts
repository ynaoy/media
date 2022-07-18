import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { requestObject } from "../../composables/kifus/requestObject"

describe("requestObject test", () => {

  // $fetchメソッドをモックする。テストメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)

  //UrlHelperのFetchResponsメソッドをモックする。テストメソッド内でこれが呼ばれたら成功
  //const FetchResponse_spy = vi.fn().mockReturnValue( Promise.resolve( { sucscess: "success" } ))
  //vi.stubGlobal("UrlHelper",vi.fn().mockReturnValue( 
  //  { FetchResponse: FetchResponse_spy }
  //))

  //メソッドに渡す変数群
  const { kifu_data } = TestHelper("")

  //このテストでチェックするやつら
  const { request_states,request_methods } = requestObject( kifu_data(),"this is csrf_token")
  const { change_button } = request_methods
  
  afterAll(()=>{
    vi.clearAllMocks()
  })

  afterEach(()=>{
    spy_fetch.mockClear()
  })

  it("引数にtrueが与えられた時にchange_buttonメソッドが正しく動作するかチェック", async() => {
    await change_button(true)
    expect(spy_fetch).toHaveBeenCalled()
    expect(request_states.favorite_flg).toBe(true)
  })

  it("引数にfalseが与えられた時にchange_buttonメソッドが正しく動作するかチェック", async() => {
    await change_button(false)
    expect(spy_fetch).toHaveBeenCalled()
    expect(request_states.favorite_flg).toBe(false)
  })

})
