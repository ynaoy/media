import { describe, it, expect, afterEach } from 'vitest'
import { EmailValidationClass } from '../../composables/validations/EmailValidationClass';

describe("EmailValidationClass test", async() => {
  
  //このテストでチェックするやつら
  const validation_class = new EmailValidationClass()

  describe("valid_emailメソッド",()=>{
    afterEach(()=>{ 
      validation_class.reset()
    })

    it("メールアドレスが空の時、バリデーションが表示されfalseが返る", async() => {
      let ret = validation_class.valid_email("")
      expect(ret).toBe(false)
      expect(validation_class.get()).toBe("メールアドレスを入力してください")
    })

    it("メールアドレスが256文字以上の時、バリデーションが表示されfalseが返る", async() => {
      let ret = validation_class.valid_email(Array(257).join("a")+"@example.com")
      expect(ret).toBe(false)
      expect(validation_class.get()).toBe("メールアドレスが長すぎます")
    })

    describe("メールアドレスの形式に沿っているかチェック",()=>{
      it("@が入っていない時、バリデーションが表示されfalseが返る", async() => {
        let ret = validation_class.valid_email("testexmaple.com")
        expect(ret).toBe(false)
        expect(validation_class.get()).toBe("メールアドレスが不正です")
      })

      it(".が二つ連続している時、バリデーションが表示されfalseが返る", async() => {
        let ret = validation_class.valid_email("test@exmaple..com")
        expect(ret).toBe(false)
        expect(validation_class.get()).toBe("メールアドレスが不正です")
      })
    })

    it("メールアドレスに不正がない時、バリデーションが表示されずtrueが返る", async() => {
      let ret = validation_class.valid_email("test@example.com")
      expect(ret).toBe(true)
      expect(validation_class.get()).toBe("")
    })
  })

})