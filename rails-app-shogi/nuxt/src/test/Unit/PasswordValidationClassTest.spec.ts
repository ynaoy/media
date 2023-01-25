import { describe, it, expect, afterEach } from 'vitest'
import { PasswordValidationClass } from '../../composables/validations/PasswordValidationClass';

describe("PasswordValidationClass test", async() => {
  
  //このテストでチェックするやつら
  const validation_class = new PasswordValidationClass()

  describe("valid_passwordメソッド",()=>{
    afterEach(()=>{ 
      validation_class.reset()
    })
    
    it("パスワードとパスワードの確認が一致しない時、バリデーションが表示されfalseが返る", async() => {
      let ret = validation_class.valid_password("password", "false_password")
      expect(ret).toBe(false)
      expect(validation_class.get()).toBe("パスワードとパスワードの確認が一致しません")
    })

    it("パスワードが8文字より短い時、バリデーションが表示されfalseが返る", async() => {
      let ret = validation_class.valid_password("ppppppp", "ppppppp")
      expect(ret).toBe(false)
      expect(validation_class.get()).toBe("パスワードが短すぎます。8文字以上にしてください")
    })

    it("パスワードに不正がない時、バリデーションが表示されずtrueが返る", async() => {
      let ret = validation_class.valid_password("password", "password")
      expect(ret).toBe(true)
      expect(validation_class.get()).toBe("")
    })
  })

})