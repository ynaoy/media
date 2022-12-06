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

  //kentosコントローラーに対して、getメソッドを飛ばして、kento変数を更新する
  const fetch_kentos = async function(){
    
    let request = fetch_data('kentos',
                            { 'id': kifu_data.kifu_id  }, 
                            {},
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

  //kento変数の値に応じて、定期的にapiのkentosと通信する、timerを指定すると共通のtimerを使いまわせる
  const fetch_kentos_interval = async function(interval_ms:number, timer=null) {
    timer = setInterval(()=>{
      console.log(request_states.kento)
      if(request_states.kento=='processing_now'){
        fetch_kentos()
      }
      else{
        clearInterval(timer)
      }
    }, interval_ms)
    return timer
  }

  //kentosコントローラーに対して、postメソッドを飛ばして、kento変数を更新する
  const post_kentos = async function(){
    
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

  //コントローラーにgetメソッドを飛ばしてDBと通信 
  const fetch_data = function(controller:String, params:{}, headers:{}, ){
    params['format'] = 'json'
    return FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/${controller}/${params.id}`,
    { method:'GET',
      params: params,
      headers: headers,
      credentials: 'include'
    })
  }

  //コントローラーにpostメソッドを飛ばしてDBと通信 
  const send_post = function(controller:String, body:{}, headers:{}, ){
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

  const request_methods = { 'change_button':          change_button,
                            'fetch_kentos' :          fetch_kentos,
                            'post_kentos'  :          post_kentos,
                            'fetch_kentos_interval':  fetch_kentos_interval,}
  return { request_states, request_methods,}
}