import { reactive } from 'vue'
import { UrlHelper } from "../UrlHelper"

export const requestObject = (kifu_data, csrf_token)=>{

  //使う関数のインポート
  const { FetchResponse } = UrlHelper()

  //リアクティブな変数群
  const request_states =reactive({
    favorite_flg: kifu_data.favorite_flg,
    kento: kifu_data.kento,
    processing: false
  })

  //メソッド群
    
  //"change_favorite"イベントで発火
  //processing.valueは子コンポーネントに飛ばして処理中ならお気に入りbuttonを押せなくする
  const change_button = async function(event){
    request_states.processing = true;
    await send_favorites(event, kifu_data.kifu_id)
    request_states.processing = false;
  }

  //favoritesコントローラーに対して、
  //お気に入りフラグがtrueならdeleteメソッドを、falseならpostメソッドを飛ばして、お気に入りフラグを更新する
  const send_favorites = async function(event, kifu_id){
    
    let request

    if(request_states.favorite_flg){
      request = send_delete('favorites',
                            {'favorite': JSON.stringify({'kifu_id': kifu_id}) },
                            { 'Authorization': csrf_token })
    }
    else{
      request = send_post('favorites',
                          { 'favorite': JSON.stringify({'kifu_id': kifu_id}) }, 
                          { 'Authorization': csrf_token })
    }
    return  request
            .then((res) => {
              request_states.favorite_flg = event
            })
            .catch((err) => {
              console.log(err)
            })
  }

  //kentosコントローラーに対して、postメソッドを飛ばして、kento変数を更新する
  const send_kentos = async function(){
    
      let request = send_post('kentos',
                          { 'kento': JSON.stringify({'id': kifu_data.kifu_id }) }, 
                          { 'Authorization': csrf_token },
                          )
    return  request
            .then((res: { kento: String }) => {
              console.log(res)
              request_states.kento = res.kento
            })
            .catch((err) => {
              console.log(err)
            })
  }

  //コントローラーにpostメソッドを飛ばしてDBと通信 
  //※paramsがクエリとして渡されてしまっているのでセキュアではない。後々治す
  const send_post = function(controller, body, headers, ){
    headers['Content-Type'] = 'application/json'
    return FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/${controller}`,
    { method:'POST',
      params: { format: 'json' },
      headers: headers,
      credentials: 'include',
      body:body
    })
  }

  //コントローラーにdeleteメソッドを飛ばしてDBと通信
  const send_delete = function(controller, params, headers){
    params['format'] = 'json'
    return FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/${controller}`,
    { method:'DELETE',
      params: params,
      headers: headers,
      credentials: 'include'
    })
  }

  const request_methods = { 'change_button': change_button,
                            'send_kentos'  : send_kentos}
  return { request_states, request_methods,}
}