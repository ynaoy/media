import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { PasswordResetHelper } from "../../composables/PasswordResetHelper";

describe("PasswordReset test", async() => {
  
  //テストヘルパーの呼び出し
  const { mock_func } = TestHelper()
  // $fetchメソッドをモックする
  const spy_fetch = mock_func("$fetch",{ data:"data" },true)
    
  //このテストでチェックするやつら
  const { reset_status, check_email_to_post, create_password_reset, update_password_reset }
    = PasswordResetHelper()

  afterAll(()=>{
    vi.clearAllMocks()
  })
  afterEach(()=>{
    spy_fetch.mockClear()
  })

  it("check_email_to_postメソッドが正しく動作するかチェック", async() => {
    await check_email_to_post({ password_reset:{ email:"testuser@example.com",} },
                              {})
    expect(spy_fetch).toHaveBeenCalled()
    expect(reset_status.value).toBe("create_password_reset")
  })

  it("create_password_resetメソッドが正しく動作するかチェック", async() => {
    await create_password_reset({ password_reset:{ email:"testuser@example.com",} },
                                {})
    expect(spy_fetch).toHaveBeenCalled()
    expect(reset_status.value).toBe("update_password_reset")
  })

  it("update_password_resetメソッドが正しく動作するかチェック", async() => {
    await update_password_reset({ password_reset:{ email:"testuser@example.com",},
                                  user:{  password:"password",
                                          password_confirmation:"password",
                                        }
                                },{})
    expect(spy_fetch).toHaveBeenCalled()
    expect(reset_status.value).toBe("finish_password_reset")
  })

})