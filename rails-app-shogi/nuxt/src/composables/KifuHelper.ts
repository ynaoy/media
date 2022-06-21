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

  return { "get_kifu": get_kifu, }
}