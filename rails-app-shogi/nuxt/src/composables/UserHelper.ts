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
                              }                        
                  ){
    params['format'] = 'json'
    await FetchResponse('http://localhost:3000/signup',
      { method:'post',
        params: params,
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

  return {  create_user: create_user }
}