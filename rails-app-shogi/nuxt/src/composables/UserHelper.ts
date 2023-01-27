import { UrlHelper } from "./UrlHelper"
import { EmailValidationClass } from "./validations/EmailValidationClass"
import { UserNameValidationClass } from "./validations/UserNameValidationClass"
import { PasswordValidationClass } from "./validations/PasswordValidationClass"

export const UserHelper = () => {
  // 使う関数のインポート
  const { FetchResponse } =UrlHelper()
  // 使うクラスの作成
  const email_validation_class = new EmailValidationClass()
  const user_name_validation_class = new UserNameValidationClass()
  const password_validation_class = new PasswordValidationClass()

  // サーバーサイドのnew_users_URLにparams付きでPostリクエストを送る。
  // jwtトークンが入ったcookieが帰ってくれば成功。さもなくばエラーを吐き出す
  // <<Todo succes_flgがダサい。そのうち改善する >>
  const create_user = 
    async function( body: { user: {
                              name:string,
                              email:string, 
                              password:string,
                              password_confirmation:string },
                          },
                    headers:{},
                    success_flg= null           
                  ){
      headers['Content-Type'] = 'application/json',
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/signup`,
        { method:'POST',
          params: { format: 'json' },
          headers: headers,
          credentials: 'include',
          body: body
        })
        .then((data) => {
          console.log(data)
          if(success_flg) success_flg.value= true
          reset_all_validation()
        })
        .catch((error) => {
          console.log(error)
          if(success_flg) success_flg.value= false
          email_validation_class.set("このメールアドレスは既に使われています")
        })
      return success_flg
    }

  const update_user = 
    async function( params:{  id: number,
                              user: { name:string }
                              },
                    headers:{},                      
                  ){
      params['format'] = 'json'
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/users/${params['id']}`,
        { method:'PATCH',
          params: params,
          headers: headers,
          credentials: 'include'
        })
        .then((data) => {
          console.log(data)
          location.href = "/"
        })
        .catch((error) => {
          console.log(error)
        })
    }

  // サーバーサイドusersコントローラーにparams付きでDELETEリクエストを送る。
  // レスポンスには{ success: String }が入ってる
  const delete_user = async ( params:{ id: number },
    headers:{} ) =>{
    params['format'] = 'json'
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/users/${params.id}`,
      { method:'DELETE',
      params: params,
      headers: headers,
      credentials: 'include'
      })
      .then((data) => {
      console.log(data)
        location.href =  location.href
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // サーバーサイドのaccount_activations_URLにparams付きでPostリクエストを送る。
  // jwtトークンが入ったcookieが帰ってくれば成功。さもなくばエラーを吐き出す
  const post_account_activations = 
    async function( body: { account_activation: {
                              email:string,
                              activation_token:string,
                              },
                          },
                    headers:{},                      
                  ){
      headers['Content-Type'] = 'application/json',
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/account_activations`,
        { method:'POST',
          params: { format: 'json' },
          headers: headers,
          credentials: 'include',
          body: body
        })
        .then((data) => {
          console.log(data)
          location.href = "/"
        })
        .catch((error) => {
          console.log(error)
        })
    }

  const get_all_user = 
    async function( params = {}, headers = {} ){

      let ret = {} 
      params['format'] = 'json'
      console.log(`${import.meta.env.VITE_API_ORIGIN}/users`)
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/users`,
        { method:'GET',
          params: params,
          headers: headers,
          credentials: 'include'
        })
        .then((data) => {
          console.log(data)
          ret =data
        })
        .catch((error) => {
          console.log(error)
        })
      return { "users": ret }
    }
  
    // ユーザーとその棋譜のデータがjson形式で帰ってくれば成功。さもなくばエラーを吐き出す
    const get_user = async (params:{ id:number },headers:{} ) =>{

      let ret = {}
      params['format'] = 'json'
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/users/${params.id}`,
        { method:'GET',
          params: params,
          headers: headers,
          credentials: 'include'
        })
        .then((data) => {
          console.log(data)
          ret = data
        })
        .catch((error) => {
          console.log(error)
        })
      return { "user_data": ret }
    }

    // ユーザーの閲覧履歴の棋譜のデータがjson形式で帰ってくれば成功。さもなくばエラーを吐き出す
    const get_users_history = async (params:{ id:number },headers:{} ) =>{

      let ret = {}
      params['format'] = 'json'
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/users/${params.id}/history`,
        { method:'GET',
          params: params,
          headers: headers,
          credentials: 'include'
        })
        .then((data) => {
          console.log(data)
          ret = data
        })
        .catch((error) => {
          console.log(error)
        })
      return { "hist_data": ret }
    }

    // ユーザーのお気に入りの棋譜のデータがjson形式で帰ってくれば成功。さもなくばエラーを吐き出す
    const get_users_favorite = async (params:{ id:number },headers:{} ) =>{

      let ret = {}
      params['format'] = 'json'
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/users/${params.id}/favorite`,
        { method:'GET',
          params: params,
          headers: headers,
          credentials: 'include'
        })
        .then((data) => {
          console.log(data)
          ret = data
        })
        .catch((error) => {
          console.log(error)
        })
      return { "favorite_kifus": ret }
    }
  
  // すべてのバリデーションをリセットする
  const reset_all_validation = ()=>{
    email_validation_class.reset()
    user_name_validation_class.reset()
    password_validation_class.reset()
  }
  
  // すべてのバリデーションをチェックしてその結果をbool値で返す
  const check_validation = (form: { name:string,
                                    email:string, 
                                    password:string,
                                    password_confirmation:string },
                                  ) =>{
    return  email_validation_class.valid_email(form.email) &&
            user_name_validation_class.valid_user_name(form.name) &&
            password_validation_class.valid_password(form.password, form.password_confirmation)
  }

  return {  create_user: create_user,
            update_user: update_user,
            delete_user: delete_user,
            post_account_activations: post_account_activations,
            get_all_user: get_all_user,
            get_user: get_user,
            get_users_history: get_users_history,
            get_users_favorite: get_users_favorite,
            check_validation: check_validation,
            get_email_validation: email_validation_class.get,
            get_user_name_validation: user_name_validation_class.get,
            get_password_validation: password_validation_class.get,
            set_email_validation: email_validation_class.set,
            set_user_name_validation: user_name_validation_class.set,
            set_password_validation: password_validation_class.set,
          }
}