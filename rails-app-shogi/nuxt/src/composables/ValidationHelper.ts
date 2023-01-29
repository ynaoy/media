import { BaseValidationClass } from "./validations/BaseValidationClass"
import { EmailValidationClass } from "./validations/EmailValidationClass"
import { UserNameValidationClass } from "./validations/UserNameValidationClass"
import { PasswordValidationClass } from "./validations/PasswordValidationClass"
import { KifuUserNameValidationClass } from "./validations/KifuUserNameValidationClass"
import { KifuContentValidationClass } from "./validations/KifuContentValidationClass"

export const ValidationHelper = () =>{
  // 使うクラスの作成
  const email_validation_class = new EmailValidationClass()
  const user_name_validation_class = new UserNameValidationClass()
  const password_validation_class = new PasswordValidationClass()
  const login_validation_class = new BaseValidationClass()
  const kifu_player1_validation_class = new KifuUserNameValidationClass()
  const kifu_player2_validation_class = new KifuUserNameValidationClass()
  const kifu_content_validation_class = new KifuContentValidationClass()

  //--メソッド--
  // すべてのバリデーションをリセットする
  const reset_all_validation = ()=>{
    email_validation_class.reset()
    user_name_validation_class.reset()
    password_validation_class.reset()
    login_validation_class.reset()
    kifu_player1_validation_class.reset()
    kifu_player2_validation_class.reset()
    kifu_content_validation_class.reset()
  }
    
  // ユーザーネーム、メールアドレス、パスワードのバリデーションをチェックしてその結果をbool値で返す
  const check_signup_validation = (form: {name:string,
                                          email:string, 
                                          password:string,
                                          password_confirmation:string },
                                  ) =>{
      const email_validation_result = email_validation_class.valid_email(form.email)
      const user_name_validation_result = user_name_validation_class.valid_user_name(form.name)
      const password_validation_result = 
                password_validation_class.valid_password(form.password, form.password_confirmation)
    return  email_validation_result && user_name_validation_result && password_validation_result
  }

  // メールアドレス、パスワードのバリデーションをチェックしてその結果をbool値で返す
  const check_login_validation = (form: {email:string, 
                                        password:string,
                                        },
                                  ) =>{
      const email_validation_result = email_validation_class.valid_email(form.email)
      const password_validation_result = 
                password_validation_class.valid_password(form.password, form.password)
      return  email_validation_result && password_validation_result
  }

  // 棋譜の先手、後手、内容のバリデーションをチェックしてその結果をbool値で返す
  const check_kifu_validation = (form: {player1:string, 
                                        player2:string,
                                        content:string
                                        },
                                  ) =>{
      const player1_validation_result = kifu_player1_validation_class.valid_kifu_user_name(form.player1)
      const player2_validation_result = kifu_player2_validation_class.valid_kifu_user_name(form.player2)
      const content_validation_result = kifu_content_validation_class.valid_kifu_content(form.content)
      return  player1_validation_result && player2_validation_result && content_validation_result
  }

  return {  get_email_validation: email_validation_class.get,
            get_user_name_validation: user_name_validation_class.get,
            get_password_validation: password_validation_class.get,
            get_login_validation: login_validation_class.get,
            set_email_validation: email_validation_class.set,
            set_user_name_validation: user_name_validation_class.set,
            set_password_validation: password_validation_class.set,
            set_login_validation: login_validation_class.set,
            get_kifu_player1_validation: kifu_player1_validation_class.get,
            get_kifu_player2_validation: kifu_player2_validation_class.get,
            get_kifu_content_validation: kifu_content_validation_class.get,
            set_kifu_player1_validation: kifu_player1_validation_class.set,
            set_kifu_player2_validation: kifu_player2_validation_class.set,
            set_kifu_content_validation: kifu_content_validation_class.set,
            reset_all_validation: reset_all_validation,
            check_signup_validation: check_signup_validation,
            check_login_validation: check_login_validation,
            check_kifu_validation: check_kifu_validation,
          }
}