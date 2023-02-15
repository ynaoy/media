import { BaseValidationClass } from "./BaseValidationClass"

export class KifuUserNameValidationClass extends BaseValidationClass {
  //--メソッド--

  // パスワードが不正ならバリデーションを表示してfalseを返す。そうでなければtrueを返す
  valid_kifu_user_name = (player:string)=>{

    if(player.length > 10){
      this.set("名前が長すぎます。10文字以下にしてください")
      return false
    }

    else{ 
      this.reset()
      return true 
    }
  }
}