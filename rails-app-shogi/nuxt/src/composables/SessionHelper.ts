export const SessionHelper = () => {
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()

  //サーバーサイドのログインURLにparams付きでPostリクエストを送る。
  //jwtトークンが入ったcookieが帰ってくれば成功。さもなくばエラーを吐き出す
  const login = async (params:{ email:string, password:string }) =>{
    params['format'] = 'json'
    await FetchResponse('http://localhost:3000/login',
      { method:'post',
        params: params,
        credentials: 'include'
      })
      .then((data) => {
        console.log(data)
        useRouter().push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //サーバーサイドのログインチェックURLにGetリクエストを送る。
  //サーバー側でチェックして成功ならtrue、失敗ならfalseを返す
  const login_check = async () =>{
    let loginFlg = false
    await FetchResponse('http://localhost:3000/login_check',{ credentials: 'include' })
    .then((data) => {
      console.log(data)
      loginFlg = true
    })
    .catch((error) => {
      console.log(error)
      loginFlg = false
    })
    return loginFlg
  }
  return {  login: login,
            login_check: login_check }
}