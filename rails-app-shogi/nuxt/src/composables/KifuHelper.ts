import { UrlHelper } from "./UrlHelper"
import { ValidationHelper } from "./ValidationHelper"

export const KifuHelper = () => {
  //使う関数のインポート
  const { FetchResponse } =UrlHelper()
  const { get_kifu_player1_validation, get_kifu_player2_validation, get_kifu_content_validation,
          set_kifu_player1_validation, set_kifu_player2_validation, set_kifu_content_validation,
          reset_all_validation, check_kifu_validation } = ValidationHelper()

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

  //サーバーサイドkifusコントローラーにparams付きでPostリクエストを送る。
  //レスポンスには{ success: String, kifu_id: Number }が入ってる
  const create_kifu = async ( body:{ kifu:{ title:"",player1:"",player2:"",kento:false,content:"",
                                            tag:{ tag_ids:[] } }},
                              headers:{} ) =>{
    headers['Content-Type'] = 'application/json',
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/kifus`,
      { method:'POST',
        params: { format:'json' },
        headers: headers,
        credentials: 'include',
        body: body
      })
      .then((data) => {
        console.log(data)
        reset_all_validation()
        location.href = `/kifus/${data.kifu_id}`
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //サーバーサイドkifusコントローラーにparams付きでDELETEリクエストを送る。
  //レスポンスには{ success: String }が入ってる
  const delete_kifu = async ( params:{ id: number },
                              headers:{} ) =>{
    params['format'] = 'json'
    await FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/kifus/${params.id}`,
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
            "delete_kifu": delete_kifu,
            "get_users_kifu": get_users_kifu,
            "get_kifu_player1_validation": get_kifu_player1_validation,
            "get_kifu_player2_validation": get_kifu_player2_validation,
            "get_kifu_content_validation": get_kifu_content_validation,
            "set_kifu_player1_validation": set_kifu_player1_validation,
            "set_kifu_player2_validation": set_kifu_player2_validation,
            "set_kifu_content_validation": set_kifu_content_validation,
            "reset_all_validation":  reset_all_validation,
            "check_validation": check_kifu_validation, // 名前が変わるので注意
          }
}