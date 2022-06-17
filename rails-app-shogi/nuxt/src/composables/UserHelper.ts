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
    async function( params:{  id: Int16Array,
                              user: { name:string }
                              },
                    headers:{},                      
                  ){
      params['format'] = 'json'
      console.log(`${import.meta.env.VITE_API_ORIGIN}/users/${params['id']}`)
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

  return {  create_user: create_user, update_user:update_user }
}