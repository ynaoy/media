import { describe, it, expect, afterEach } from 'vitest'
import { UserNameValidationClass } from '../../composables/validations/UserNameValidationClass';

describe("UserNameValidationClass test", async() => {
  
  //このテストでチェックするやつら
  const validation_class = new UserNameValidationClass()

  describe("valid_user_nameメソッド",()=>{
    afterEach(()=>{ 
      validation_class.reset()
    })

    it("ユーザー名が空の時、バリデーションが表示されfalseが返る", async() => {
      let ret = validation_class.valid_user_name("")
      expect(ret).toBe(false)
      expect(validation_class.get()).toBe("ユーザー名を入力してください")
    })

    it("ユーザー名が16文字以上の時、バリデーションが表示されfalseが返る", async() => {
      let ret = validation_class.valid_user_name("ユーザー名が長すぎます。16文字以下にしてください")
      expect(ret).toBe(false)
      expect(validation_class.get()).toBe("ユーザー名が長すぎます。16文字以下にしてください")
    })

    it("ユーザー名に不正がない時、バリデーションが表示されずtrueが返る", async() => {
      let ret = validation_class.valid_user_name("ユーザー名")
      expect(ret).toBe(true)
      expect(validation_class.get()).toBe("")
    })
  })

})