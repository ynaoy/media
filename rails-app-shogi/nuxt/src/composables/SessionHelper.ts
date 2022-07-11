import { UrlHelper } from "./UrlHelper"
export const SessionHelper = () => {
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()

  //サーバーサイドのログインURLにparams付きでPostリクエストを送る。
  //jwtトークンが入ったcookieが帰ってくれば成功。さもなくばエラーを吐き出す
  const login = async (params:{ session:{ email:string, password:string}},headers:{} ) =>{
    params['format'] = 'json'
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/login`,
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

  //サーバーサイドのログインチェックURLにGetリクエストを送る。
  //サーバー側でチェックして成功ならtrue、失敗ならfalseを返す
  const login_check = async() =>{
    let Flg = false
    let data = {}
    let csrf_token :string
    console.log( import.meta.env.VITE_API_ORIGIN)
    await fetch(`${import.meta.env.VITE_API_ORIGIN}/login_check`,{ credentials: 'include' })
    .then((response) => {
      csrf_token = response.headers.get("csrf_token")
      return response.json()
    })
    .then(json => {
      data = json
      Flg = (json['user_id'] == null )? false : true 
    })
    .catch((error) => {
      console.log(error)
    })
    return { 'data':data, 'loginFlg':Flg, 'csrf_token':csrf_token, }
  }

  const logout = async (headers:{} ) =>{
    const params = {}
    params['format'] = 'json'
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/logout`,
      { method:'DELETE',
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

  //ログインしていなかったらログインページに飛ばす
  const force_login= (loginFlg)=>{
    if (!loginFlg) {
      return navigateTo('/login') 
    }
  }
  return {  login: login,
            login_check: login_check,
            logout: logout,
            force_login: force_login}
}