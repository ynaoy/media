import { UrlHelper } from "./UrlHelper"
import { LoginValidationHelper } from "./ValidationHelper"

export const SessionHelper = () => {
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()
  const { get_email_validation, get_password_validation, get_login_validation,
          set_email_validation, set_password_validation, set_login_validation,
          reset_all_validation, check_login_validation } = LoginValidationHelper()

  //サーバーサイドのログインURLにparams付きでPostリクエストを送る。
  //jwtトークンが入ったcookieが帰ってくれば成功。さもなくばエラーを吐き出す
  const login = async ( body: { session:{ email:string, password:string}},
                        headers:{[key:string]:any} ):Promise<void> =>{
    headers['Content-Type'] = 'application/json',
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/login`,
      { method:'POST',
        params: { format: 'json' },
        headers: headers,
        credentials: 'include',
        body: body
      })
      .then((data) => {
        console.log(data)
        reset_all_validation()
        redirect_back_or_home()
      })
      .catch((error) => {
        console.log(error)
        reset_all_validation()
        set_login_validation("メールアドレスかパスワードに誤りがあります")
      })
  }

  //サーバーサイドのログインチェックURLにGetリクエストを送る。
  //サーバー側でチェックして成功ならtrue、失敗ならfalseを返す
  const login_check = async():Promise<{[key:string]:any}> =>{
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

  const logout = async (headers:{[key:string]:any}):Promise<void> =>{
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
  const force_login= (loginFlg:boolean)=>{
    if (!loginFlg) {
      store_location()
      return navigateTo('/login') 
    }
  }

  //sessionに今いるページのurlを保持する
  const store_location = ():void=>{
    sessionStorage.setItem('store_location', location.href)
  }

  //sessionに'store_location'キーがあればそのページに、なければホームにリダイレクトする
  const redirect_back_or_home = ():void=>{
    let sess = sessionStorage.getItem('store_location');
    console.log(sess)
    location.href = (sess == null) ? '/' : sess;
    sessionStorage.removeItem('store_location');
  }

  return {  login: login,
            login_check: login_check,
            logout: logout,
            force_login: force_login,
            store_location: store_location,
            redirect_back_or_home: redirect_back_or_home,
            reset_all_validation: reset_all_validation,
            check_validation: check_login_validation, // 名前が変わるので注意
            get_email_validation: get_email_validation,
            get_password_validation: get_password_validation,
            get_login_validation: get_login_validation,
            set_email_validation: set_email_validation,
            set_password_validation: set_password_validation,
            set_login_validation: set_login_validation,
          }
}