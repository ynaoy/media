import { UrlHelper } from "./UrlHelper"

export const PasswordResetHelper = () =>{
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()
  const reset_status = ref("ready")
  const validation = ref("")

  //サーバーサイドのpassword_reset/check_emailに、ユーザー検索用のemailのparams付きでPostリクエストを送る。
  //Responseにsuccessキーがあればreset_statusを更新
  const check_email_to_post = 
    async function( body: { password_reset: {
                              email:string, 
                            },
                          },
                    headers:{}         
                  ){
      headers['Content-Type'] = 'application/json',
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/password_resets/check_email`,
        { method:'POST',
          params: { format: 'json' },
          headers: headers,
          credentials: 'include',
          body: body
        })
        .then((data) => {
          console.log(data)
          reset_validation()
          reset_status.value= "create_password_reset"
        })
        .catch((error) => {
          console.log(error)
          validation.value = "ユーザーが存在しません"
        })
  }

  //サーバーサイドのpassword_resetに、ユーザー検索用に使うemailのparams付きでPostリクエストを送る。
  //Responseにsuccessキーがあればreset_statusを更新
  const  create_password_reset = 
    async function( body: { password_reset: {
                              email:string, 
                            },
                          },
                    headers:{},          
                ){
    headers['Content-Type'] = 'application/json',
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/password_resets`,
      { method:'POST',
        params: { format: 'json' },
        headers: headers,
        credentials: 'include',
        body: body
      })
      .then((data) => {
        console.log(data)
        reset_validation()
        reset_status.value= "check_token"
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //サーバーサイドのpassword_reset/check_tokenに、ユーザー検索用に使うemailと、
  //認証用のreset_tokenのparams付きでPostリクエストを送る。
  //Responseにsuccessキーがあればreset_statusを更新
  const  check_token = 
    async function( body: { password_reset: {
                              email:string, 
                            },
                            reset_token: string,
                          },
                    headers:{},          
                ){
    headers['Content-Type'] = 'application/json',
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/password_resets/check_token`,
      { method:'POST',
        params: { format: 'json' },
        headers: headers,
        credentials: 'include',
        body: body
      })
      .then((data) => {
        console.log(data)
        reset_validation()
        reset_status.value= "update_password_reset"
      })
      .catch((error) => {
        console.log(error)
        validation.value = "認証コードが間違っています"
      })
  }

  //サーバーサイドのpassword_reset/password_updateに、
  //ユーザー検索用のemailと更新用のパスワードと認証用のreset_tokenの、params付きでPATCHリクエストを送る。
  //Responseにsuccessキーがあればreset_statusを更新
  const update_password_reset = 
    async function( body: { password_reset: {
                              email:string, 
                            },
                            user:{
                              password:string,
                              password_confirmation:string,
                            },
                            reset_token: String,
                        },
                    headers:{},         
                ){
    headers['Content-Type'] = 'application/json',
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/password_resets/update_password`,
      { method:'PATCH',
        params: { format: 'json' },
        headers: headers,
        credentials: 'include',
        body: body
      })
      .then((data) => {
        console.log(data)
        reset_validation()
        reset_status.value= "ready"
        location.href = "/"
      })
      .catch((error) => {
        console.log(error)
        validation.value = "パスワードが不正です"
      })
  }

  const set_reset_status = function(status){
    reset_status.value=status
  }

  const reset_validation = function(){
    validation.value = ""
  }


  return {  reset_status: reset_status,
            validation: validation,
            check_email_to_post: check_email_to_post,
            create_password_reset: create_password_reset,
            check_token: check_token,
            update_password_reset: update_password_reset,
            set_reset_status: set_reset_status,
            reset_validation: reset_validation,
          }
}