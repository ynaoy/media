import { BaseValidationClass } from "./BaseValidationClass"

export class UserNameValidationClass extends BaseValidationClass {
  //--メソッド--

  // パスワードが不正ならバリデーションを表示してfalseを返す。そうでなければtrueを返す
  valid_user_name = (user_name:string)=>{

    if(user_name.length == 0){
      this.set("ユーザー名を入力してください")
      return false
    }

    else if(user_name.length > 16){
      this.set("ユーザー名が長すぎます。16文字以下にしてください")
      return false
    }

    else{ 
      return true 
    }
  }
}