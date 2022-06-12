export const SessionHelper = () => {
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()
  //const { loginFlg }  = globalState()
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
        //loginFlg.value = true
        location.href = "/"
        //useRouter().push('/')
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
    await FetchResponse('http://localhost:3000/login_check',{ credentials: 'include' })
    .then((res) => {
      data = res
      Flg = (res['errors'] == null )? true : false 
    })
    .catch((error) => {
      console.log(error)
    })
    return { 'data':data, 'loginFlg':Flg }
  }
  return {  login: login,
            login_check: login_check }
}