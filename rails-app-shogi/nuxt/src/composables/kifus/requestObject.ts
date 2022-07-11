
import { reactive } from 'vue'

export const requestObject = (kifu_data, csrf_token)=>{

  //使う関数のインポート
  const { FetchResponse } = UrlHelper()

  //リアクティブな変数群
  const request_states =reactive({
    favorite_flg: kifu_data.favorite_flg,
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

  //コントローラーにpostメソッドを飛ばしてDBと通信
  const send_post = function(controller, params, headers){
    params['format'] = 'json'
    return FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/${controller}`,
    { method:'POST',
      params: params,
      headers: headers,
      credentials: 'include'
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

  const request_methods = { 'change_button': change_button,}
  return { request_states, request_methods }
}