import { describe, it, expect, afterEach } from 'vitest'
import { BaseValidationClass } from '../../composables/validations/BaseValidationClass';

describe("BaseValidationClass test", async() => {
  
  //このテストでチェックするやつら
  const validation_class = new BaseValidationClass()

  describe("getメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      expect(validation_class.get()).toBe("")
    })
  })

  describe("setメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      expect(validation_class.get()).toBe("")
      validation_class.set("test")
      expect(validation_class.get()).toBe("test")
    })
  })

  describe("resetメソッド",()=>{
    it("正しく動作するかチェック", async() => {
      validation_class.set("test")
      expect(validation_class.get()).toBe("test")
      validation_class.reset()
      expect(validation_class.get()).toBe("")
    })
  })

})