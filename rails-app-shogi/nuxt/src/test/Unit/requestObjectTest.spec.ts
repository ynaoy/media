import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { requestObject } from "../../composables/kifus/requestObject"

describe("requestObject test", () => {

  //テストヘルパーの呼び出し
  const { mock_func } = TestHelper()
  // $fetchメソッドをモックする。テストメソッド内でこれが呼ばれたら成功
  const spy_fetch = mock_func("$fetch",{ kento:"processing_now" },true)

  //メソッドに渡す変数群
  const { kifu_data } = TestHelper("")

  //このテストでチェックするやつら
  const { request_states,request_methods } = requestObject( kifu_data(),"this is csrf_token")
  const { change_button, 
          fetch_kentos, 
          post_kentos, 
          fetch_kentos_interval } = request_methods
  
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

  it("send_kentosメソッドが呼び出された時、apiと通信できているか、request_statesの値が更新されているかチェック",
    async() => {
      await post_kentos()
      expect(spy_fetch).toHaveBeenCalled()
      expect(request_states.kento).toBe("processing_now")
    }
  )

  it("fetch_kentosメソッドが呼び出された時、apiと通信できているか",
    async() => {
      await fetch_kentos()
      expect(spy_fetch).toHaveBeenCalled()
    }
  )

  it("fetch_kentos_intervalメソッドが呼び出された時、apiと通信できているかチェック",
    async() => {
      //request_states.kento = "processing_now"
      await fetch_kentos()
      await fetch_kentos_interval(60000)
      expect(spy_fetch).toHaveBeenCalledTimes(1)
      setTimeout(()=>{
        expect(spy_fetch).toHaveBeenCalledTimes(2)
      },70000)
    }
  )
})
