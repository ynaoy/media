import { BaseValidationClass } from "./BaseValidationClass"

export class KifuContentValidationClass extends BaseValidationClass {
  //--メソッド--

  // パスワードが不正ならバリデーションを表示してfalseを返す。そうでなければtrueを返す
  valid_kifu_content = (kifu:string)=>{

    if(kifu.length == 0){
      this.set("棋譜を入力してください")
      return false
    }

    else{ 
      this.reset()
      return true 
    }
  }
}