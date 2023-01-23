import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { PasswordResetHelper } from "../../composables/PasswordResetHelper";

describe("PasswordReset test", async() => {
  
  //テストヘルパーの呼び出し
  const { mock_func } = TestHelper()
  // $fetchメソッドをモックする
  const spy_fetch = mock_func("$fetch",{ data:"data" },true)
  //このテストでチェックするやつら
  const { reset_status, validation, 
          check_email_to_post, create_password_reset, check_token, update_password_reset }
    = PasswordResetHelper()

  afterAll(()=>{
    vi.clearAllMocks()
  })
  afterEach(()=>{
    spy_fetch.mockClear()
  })
  describe("check_email_to_postメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      await check_email_to_post({ password_reset:{ email:"testuser@example.com",} },
                                {})
      expect(spy_fetch).toHaveBeenCalled()
      expect(reset_status.value).toBe("create_password_reset")
    })

    it("apiからのレスポンスがエラー時に正しく動作するかチェック", async() => {
      spy_fetch.mockRejectedValueOnce(new Error("error"))
      await check_email_to_post({ password_reset:{ email:"testuser@example.com",} },
                              {})
      expect(spy_fetch).toHaveBeenCalled()
      expect(validation.value).toBe("ユーザーが存在しません")
    })
  })

  describe("create_password_resetメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      await create_password_reset({ password_reset:{ email:"testuser@example.com",} },
                                  {})
      expect(spy_fetch).toHaveBeenCalled()
      expect(reset_status.value).toBe("check_token")
    })

    it("apiからのレスポンスがエラー時に正しく動作するかチェック", async() => {
      spy_fetch.mockRejectedValueOnce(new Error("error"))
      await create_password_reset({ password_reset:{ email:"testuser@example.com",} },
                                  {})
      expect(spy_fetch).toHaveBeenCalled()
      expect(validation.value).toBe("ユーザーが存在しません")
    })
  })
  

  describe("check_tokenメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      await check_token({ password_reset:{ email:"testuser@example.com",},
                          reset_token: "this is reset_token" },
                        {})
      expect(spy_fetch).toHaveBeenCalled()
      expect(reset_status.value).toBe("update_password_reset")
    })

    it("apiからのレスポンスがエラー時に正しく動作するかチェック", async() => {
      spy_fetch.mockRejectedValueOnce(new Error("error"))
      await check_token({ password_reset:{ email:"testuser@example.com",},
                          reset_token: "this is reset_token" },
                        {})
      expect(spy_fetch).toHaveBeenCalled()
      expect(validation.value).toBe("認証コードが間違っています")
    })
  })

  describe("update_password_resetメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      await update_password_reset({ password_reset:{ email:"testuser@example.com",},
                                    user:{  password:"password",
                                            password_confirmation:"password",
                                          },
                                    reset_token: "this is reset_token"
                                  },{})
      expect(spy_fetch).toHaveBeenCalled()
      expect(reset_status.value).toBe("ready")
    })

    it("apiからのレスポンスがエラー時に正しく動作するかチェック", async() => {
      spy_fetch.mockRejectedValueOnce(new Error("error"))
      await update_password_reset({ password_reset:{ email:"testuser@example.com",},
                                    user:{  password:"password",
                                            password_confirmation:"password",
                                          },
                                    reset_token: "this is reset_token"
                                  },{})
      expect(spy_fetch).toHaveBeenCalled()
      expect(validation.value).toBe("パスワードが不正です")
    })
  })

})