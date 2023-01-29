import { describe, it, expect, afterEach } from 'vitest'
import { KifuUserNameValidationClass } from '../../composables/validations/KifuUserNameValidationClass';

describe("KifuUserNameValidationClass test", async() => {
  
  //このテストでチェックするやつら
  const validation_class = new KifuUserNameValidationClass()

  describe("valid_kifu_user_nameメソッド",()=>{
    afterEach(()=>{ 
      validation_class.reset()
    })

    it("棋譜のユーザーネームが11文字以上の時、バリデーションが表示されfalseが返る", async() => {
      let ret = validation_class.valid_kifu_user_name(Array(12).join("a")) // Arrayの引数は n+1
      expect(ret).toBe(false)
      expect(validation_class.get()).toBe("名前が長すぎます。10文字以下にしてください")
    })

    it("棋譜のユーザーネームに不正がない時、バリデーションが表示されずtrueが返る", async() => {
      let ret = validation_class.valid_kifu_user_name("TestUser") 
      expect(ret).toBe(true)
      expect(validation_class.get()).toBe("")
    })
  })

})