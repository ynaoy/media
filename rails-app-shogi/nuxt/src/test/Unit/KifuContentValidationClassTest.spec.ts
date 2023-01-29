import { describe, it, expect, afterEach } from 'vitest'
import { KifuContentValidationClass } from '../../composables/validations/KifuContentValidationClass';

describe("KifuContentValidationClass test", async() => {
  
  //このテストでチェックするやつら
  const validation_class = new KifuContentValidationClass()

  describe("valid_kifu_contentメソッド",()=>{
    afterEach(()=>{ 
      validation_class.reset()
    })

    it("棋譜が空の時、バリデーションが表示されfalseが返る", async() => {
      let ret = validation_class.valid_kifu_content("")
      expect(ret).toBe(false)
      expect(validation_class.get()).toBe("棋譜を入力してください")
    })

    it("棋譜に不正がない時、バリデーションが表示されずtrueが返る", async() => {
      let ret = validation_class.valid_kifu_content("TestKifu") 
      expect(ret).toBe(true)
      expect(validation_class.get()).toBe("")
    })
  })

})