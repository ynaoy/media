import { BaseValidationClass } from "./BaseValidationClass"

export class PasswordValidationClass extends BaseValidationClass {
  //--メソッド--

  // パスワードが不正ならバリデーションを表示してfalseを返す。そうでなければtrueを返す
  valid_password = (password:string, password_confirmation:string)=>{

    if(password.length == 0){
      this.set("パスワードを入力してください")
      return false
    }

    else if(password.length < 8){
      this.set("パスワードが短すぎます。8文字以上にしてください")
      return false
    }

    else if(password != password_confirmation){
      this.set("パスワードとパスワードの確認が一致しません")
      return false
    }

    else{ 
      return true 
    }
  }
}