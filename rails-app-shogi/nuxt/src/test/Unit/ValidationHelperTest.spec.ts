import { describe, it, expect, afterEach } from 'vitest'
import { ValidationHelper } from "../../composables/ValidationHelper";

describe("ValidationHelper test", async() => {
  
  //このテストでチェックするやつら
  const { get_email_validation, get_user_name_validation, get_password_validation,
          set_email_validation, set_user_name_validation, set_password_validation,
          reset_all_validation, check_signup_validation, check_login_validation,
        } = ValidationHelper()
  
  afterEach(()=>{
    set_email_validation("")
    set_user_name_validation("")
    set_password_validation("")
  })

  describe("check_signup_validationメソッド",()=>{
    it("問題ない時にtrueが返ってくるかチェック", async() => {
      expect(check_signup_validation({name:"TestUser",
                                      email:"test@example.com", 
                                      password:"password",
                                      password_confirmation:"password" })
      ).toEqual(true)
    })
  })

  describe("check_login_validation メソッド",()=>{
    it("問題ない時にtrueが返ってくるかチェック", async() => {
      expect(check_login_validation ({email:"test@example.com", 
                                      password:"password",
                                      password_confirmation:"password" })
      ).toEqual(true)
    })
  })

  describe("reset_all_validationメソッド",()=>{
    it("バリデーションがすべてリセットされているか", async() => {
      set_email_validation("テストバリデーション")
      set_user_name_validation("テストバリデーション")
      set_password_validation("テストバリデーション")
      reset_all_validation()
      expect(get_email_validation()).toBe("")
      expect(get_user_name_validation()).toBe("")
      expect(get_password_validation()).toBe("")
    })
  })

})