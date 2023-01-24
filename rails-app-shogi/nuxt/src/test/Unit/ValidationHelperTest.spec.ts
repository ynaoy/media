import { describe, it, expect } from 'vitest'
import { ValidationHelper } from "../../composables/ValidationHelper";

describe("ValidationHelper test", async() => {
  
  //このテストでチェックするやつら
  const { get_validation, set_validation, reset_validation, } = ValidationHelper()

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
})