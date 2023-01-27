import { BaseValidationClass } from "./BaseValidationClass"

export class EmailValidationClass extends BaseValidationClass {
  //--メソッド--

  // パスワードが不正ならバリデーションを表示してfalseを返す。そうでなければtrueを返す
  valid_email = (email:string)=>{
    const VALID_EMAIL_REGEX = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+/i
    if(email.length == 0){

      this.set("メールアドレスを入力してください")
      return false
    }

    else if(email.length > 255){
      this.set("メールアドレスが長すぎます")
      return false
    }

    else if(!VALID_EMAIL_REGEX.test(email)){
      this.set("メールアドレスが不正です")
      return false
    }

    else{ 
      return true 
    }
  }
}