import { BaseValidationClass } from "./validations/BaseValidationClass"
import { EmailValidationClass } from "./validations/EmailValidationClass"
import { UserNameValidationClass } from "./validations/UserNameValidationClass"
import { PasswordValidationClass } from "./validations/PasswordValidationClass"

export const ValidationHelper = () =>{
  // 使うクラスの作成
  const email_validation_class = new EmailValidationClass()
  const user_name_validation_class = new UserNameValidationClass()
  const password_validation_class = new PasswordValidationClass()
  const login_validation_class = new BaseValidationClass()

  //--メソッド--
  // すべてのバリデーションをリセットする
  const reset_all_validation = ()=>{
    email_validation_class.reset()
    user_name_validation_class.reset()
    password_validation_class.reset()
    login_validation_class.reset()
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

  return {  get_email_validation: email_validation_class.get,
            get_user_name_validation: user_name_validation_class.get,
            get_password_validation: password_validation_class.get,
            get_login_validation: login_validation_class.get,
            set_email_validation: email_validation_class.set,
            set_user_name_validation: user_name_validation_class.set,
            set_password_validation: password_validation_class.set,
            set_login_validation: login_validation_class.set,
            reset_all_validation: reset_all_validation,
            check_signup_validation: check_signup_validation,
            check_login_validation: check_login_validation,
          }
}