export const ValidationHelper = () =>{
  //--メンバ変数--
  const validation = ref("")

  //--メソッド--
  const get_validation = ()=>{ return validation.value }

  const set_validation = (new_validation:string)=>{ validation.value = new_validation }

  const reset_validation = ()=>{ validation.value = "" }

  // パスワードが不正ならバリデーションを表示してfalseを返す。そうでなければtrueを返す
  const valid_password = (password:string, password_confirmation:string) =>{
    if(password != password_confirmation){
      set_validation("パスワードとパスワードの確認が一致しません")
      return false
    }

    else if(password.length < 8){
      set_validation("パスワードが短すぎます。8文字以上にしてください")
      return false
    }

    else{ 
      return true 
    }
  }
  return {  get_validation: get_validation,
            set_validation: set_validation,
            reset_validation: reset_validation,
            valid_password: valid_password,
          }
}