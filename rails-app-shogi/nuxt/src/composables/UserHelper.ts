import { UrlHelper } from "./UrlHelper"
import { SignupValidationHelper } from "./ValidationHelper"
import { Ref } from 'vue'
import { ReturnVoid } from "~~/pages/__VLS_types"

export const UserHelper = () => {
  // 使う関数のインポート
  const { FetchResponse } =UrlHelper()
  const { get_email_validation, get_user_name_validation, get_password_validation,
          set_email_validation, set_user_name_validation, set_password_validation,
          reset_all_validation, check_signup_validation } = SignupValidationHelper()

  // サーバーサイドのnew_users_URLにparams付きでPostリクエストを送る。
  // jwtトークンが入ったcookieが帰ってくれば成功。さもなくばエラーを吐き出す
  // <<Todo succes_flgがダサい。そのうち改善する >>
  const create_user = 
    async ( body: { user: {
                            name:string,
                            email:string, 
                            password:string,
                            password_confirmation:string },
                  },
                  headers:{[key:string]:any},
                  success_flg:Ref<boolean> = null//指定しない場合はフラグが更新されない       
                  )=>{
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
          set_email_validation("このメールアドレスは既に使われています")
        })
      return success_flg
    }

  const update_user = 
    async ( params:{  id: number,
                      user: { name:string }
                    },
            headers:{[key:string]:any},                      
                  ):Promise<void>=>{
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
                              headers:{[key:string]:any}
                            ):Promise<void> =>{
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
    async ( body: { account_activation: {
                    email:string,
                    activation_token:string,
                  }},
            headers:{},                      
          ):Promise<void>=>{
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
    async ( params = {}, headers = {} ):Promise<{[key:string]:any}>=>{

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
    const get_user = async (  params:{ id:number },
                              headers:{[key:string]:any}
                            ):Promise<{[key:string]:any}> =>{

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
    const get_users_history = async ( params:{ id:number },
                                      headers:{[key:string]:any}
                                    ):Promise<{[key:string]:any}>=>{

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
    const get_users_favorite = async (  params:{ id:number },
                                        headers:{[key:string]:any} 
                                      ):Promise<{[key:string]:any}> =>{

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
  

  return {  create_user: create_user,
            update_user: update_user,
            delete_user: delete_user,
            post_account_activations: post_account_activations,
            get_all_user: get_all_user,
            get_user: get_user,
            get_users_history: get_users_history,
            get_users_favorite: get_users_favorite,
            reset_all_validation: reset_all_validation,
            check_validation: check_signup_validation, // 名前が変わるので注意
            get_email_validation: get_email_validation,
            get_user_name_validation: get_user_name_validation,
            get_password_validation: get_password_validation,
            set_email_validation: set_email_validation,
            set_user_name_validation: set_user_name_validation,
            set_password_validation: set_password_validation,
          }
}