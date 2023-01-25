import { describe, it, expect, afterEach } from 'vitest'
import { ValidationHelper } from "../../composables/ValidationHelper";

describe("ValidationHelper test", async() => {
  
  //このテストでチェックするやつら
  const { get_validation, set_validation, reset_validation, valid_password } = ValidationHelper()

  describe("get_validationメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      expect(get_validation()).toBe("")
    })
  })

  describe("set_validationメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      expect(get_validation()).toBe("")
      set_validation("test")
      expect(get_validation()).toBe("test")
    })
  })

  describe("reset_validationメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      set_validation("test")
      expect(get_validation()).toBe("test")
      reset_validation()
      expect(get_validation()).toBe("")
    })
  })

  describe("valid_passwordメソッド",()=>{
    afterEach(()=>{ 
      reset_validation()
    })
    
    it("パスワードとパスワードの確認が一致しない時、バリデーションが表示されfalseが返る", async() => {
      let ret = valid_password("password", "false_password")
      expect(ret).toBe(false)
      expect(get_validation()).toBe("パスワードとパスワードの確認が一致しません")
    })

    it("パスワードが8文字より短い時、バリデーションが表示されfalseが返る", async() => {
      let ret = valid_password("ppppppp", "ppppppp")
      expect(ret).toBe(false)
      expect(get_validation()).toBe("パスワードが短すぎます。8文字以上にしてください")
    })

    it("パスワードに不正がない時、バリデーションが表示されずtrueが返る", async() => {
      let ret = valid_password("password", "password")
      expect(ret).toBe(true)
      expect(get_validation()).toBe("")
    })
  })
})