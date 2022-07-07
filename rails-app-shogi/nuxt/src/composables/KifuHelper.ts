export const KifuHelper = () => {
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()

  //サーバーサイドkifus/[id]にparams付きでGETリクエストを送る。
  //棋譜のデータがjson形式で帰ってくれば成功。さもなくばエラーを吐き出す
  const get_kifu = async (params:{ id:number },headers:{} ) =>{

    let ret = {}
    params['format'] = 'json'
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/kifus/${params.id}`,
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
    return { "kifu_data": ret }
  }

  //サーバーサイドkifuコントローラーにparams付きでPostリクエストを送る。
  //レスポンスには{ success: String, kifu_id: Number }が入ってる
  const create_kifu = async ( params:{ kifu:{ title:"",player1:"",player2:"",content:"",
                                              tag:{ tag_ids:[] } }},
                              headers:{} ) =>{
    let ret = {}
    params['format'] = 'json'
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/kifus`,
      { method:'POST',
        params: params,
        headers: headers,
        credentials: 'include'
      })
      .then((data) => {
        console.log(data)
        location.href = `/kifus/${data.kifu_id}`
      })
      .catch((error) => {
        console.log(error)
      })
  }

    //ログインしているユーザーの棋譜のデータがjson形式で帰ってくれば成功。さもなくばエラーを吐き出す
    const get_users_kifu = async () =>{

      let ret = {} 
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/kifus`,
        { method:'GET',
          params: { format: 'json'},
          headers: {},
          credentials: 'include'
        })
        .then((data) => {
          console.log(data)
          ret = data
        })
        .catch((error) => {
          console.log(error)
        })
      return { "kifus": ret }
    }

  return {  "get_kifu": get_kifu,
            "create_kifu": create_kifu,
            "get_users_kifu": get_users_kifu}
}