import { UrlHelper } from "./UrlHelper"

export const PasswordResetHelper = () =>{
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()
  const reset_status = ref("ready")

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
          reset_status.value= "create_password_reset"
        })
        .catch((error) => {
          console.log(error)
        })
  }

  //サーバーサイドのpassword_resetに、ユーザー検索用のemailのparams付きでPostリクエストを送る。
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
        reset_status.value= "update_password_reset"
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //サーバーサイドのpassword_reset/password_updateに、
  //ユーザー検索用のemailと更新用のパスワードの、params付きでPATCHリクエストを送る。
  //Responseにsuccessキーがあればreset_statusを更新
  const update_password_reset = 
    async function( body: { password_reset: {
                              email:string, 
                            }
                            user:{
                              password:string,
                              password_confirmation:string,
                            }
                          ,
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
        reset_status.value= "ready"
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const set_reset_status = function(status){
    reset_status.value=status
  }


  return {  reset_status: reset_status,
            check_email_to_post: check_email_to_post,
            create_password_reset: create_password_reset,
            update_password_reset: update_password_reset,
            set_reset_status: set_reset_status,
          }
}