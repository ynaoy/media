import { UrlHelper } from "./UrlHelper"

export const UserHelper = () => {
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()

  //サーバーサイドのログインURLにparams付きでPostリクエストを送る。
  //jwtトークンが入ったcookieが帰ってくれば成功。さもなくばエラーを吐き出す
  const create_user = 
    async function( params:{  user: {
                                name:string,
                                email:string, 
                                password:string,
                                password_confirmation:string }
                              },
                    headers:{},                      
                  ){
      params['format'] = 'json'
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/signup`,
        { method:'POST',
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

  //サーバーサイドusersコントローラーにparams付きでDELETEリクエストを送る。
  //レスポンスには{ success: String }が入ってる
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

  return {  create_user: create_user,
            update_user: update_user,
            delete_user: delete_user,
            get_all_user: get_all_user,
            get_user: get_user }
}