import { UrlHelper } from "./UrlHelper"

export const SearchHelper = () => {
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()

  //サーバーサイドのSearchURLにparams付きでGETリクエストを送る。
  //usersとkifusが入った連想配列が帰ってくれば成功。さもなくばエラーを吐き出す
  const search_user_and_kifu = 
    async function( params:{ query: String},
                    headers:{},                      
                  ){

      let ret
      params['format'] = 'json'
      await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/search`,
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
      return { "search_data": ret }
    }

    // クエリ付きでsearchページに飛ばす。他にもっといいやり方ありそう
    const move_search =(query)=>{
      location.href = `${location.origin}/search?search=${query}`
    }

  return {  search_user_and_kifu: search_user_and_kifu, move_search: move_search }
}