import { reactive, computed, Ref } from 'vue'
import { UrlHelper } from "../UrlHelper"

interface kifu_data_type {  [key:string]: any,
                            favorite_flg: boolean,
                            kento: null|string|{[key:string]:any},
                            kifu_id: number }

export const requestObject = (kifu_data:Ref<kifu_data_type>, csrf_token:string)=>{
  //使う関数のインポート
  const { FetchResponse } = UrlHelper()

  //リアクティブな変数群
  const request_states= reactive({
      favorite_flg: kifu_data.value.favorite_flg,
      kento: kifu_data.value.kento,
      processing: false,
      kifu_id: computed(()=> kifu_data.value.kifu_id)
    })

  //メソッド群
    
  //"change_favorite"イベントで発火
  //processing.valueは子コンポーネントに飛ばして処理中ならお気に入りbuttonを押せなくする
  const change_button = async(event:boolean):Promise<void>=>{
    console.log(request_states.favorite_flg)
    request_states.processing = true;
    await send_favorites(event, request_states.kifu_id)
    request_states.processing = false;
  }

  //favoritesコントローラーに対して、
  //お気に入りフラグがtrueならdeleteメソッドを、falseならpostメソッドを飛ばして、お気に入りフラグを更新する
  const send_favorites = async(event:boolean, kifu_id:number):Promise<any>=>{
    
    let request:Promise<any>
    console.log(request_states.favorite_flg)
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
              update_favorite_flg(event)
            })
            .catch((err) => {
              console.log(err)
            })
  }

  //kentosコントローラーに対して、getメソッドを飛ばして、kento変数を更新する
  const fetch_kentos = async ():Promise<any> =>{
    
    let request = fetch_data('kentos',
                            { 'id': request_states.kifu_id  }, 
                            {},
                        )
  return  request
          .then((res: { kento:string }) => {
            console.log(res)
            update_kento(res.kento)
          })
          .catch((err) => {
            console.log(err)
          })
  }

  //kento変数の値に応じて、定期的にapiのkentosと通信する、timerを指定すると共通のtimerを使いまわせる
  const fetch_kentos_interval = async(interval_ms:number, timer=null) :Promise<NodeJS.Timer|number>=>{
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
  const post_kentos = async():Promise<any>=>{
    
    let request = send_post('kentos',
                            { 'kento': JSON.stringify({'id': request_states.kifu_id }) }, 
                            { 'Authorization': csrf_token },
                          )
    return  request
            .then((res: { kento:string }) => {
              console.log(res)
              update_kento(res.kento)
            })
            .catch((err) => {
              console.log(err)
            })
  }

  //コントローラーにgetメソッドを飛ばしてDBと通信 
  const fetch_data = (controller:string,
                      params:{[key:string]:any},
                      headers:{[key:string]:any}):Promise<any>=>{
    params['format'] = 'json'
    return FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/${controller}/${params.id}`,
    { method:'GET',
      params: params,
      headers: headers,
      credentials: 'include'
    })
  }

  //コントローラーにpostメソッドを飛ばしてDBと通信 
  const send_post = ( controller:string, 
                      body:{[key:string]:any},
                      headers:{[key:string]:any}):Promise<any>=>{
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
  const send_delete = ( controller:string,
                        params:{[key:string]:any},
                        headers:{[key:string]:any}):Promise<any>=>{
    params['format'] = 'json'
    return FetchResponse(`${import.meta.env.VITE_API_ORIGIN}/${controller}`,
    { method:'DELETE',
      params: params,
      headers: headers,
      credentials: 'include'
    })
  }

  const update_favorite_flg = (new_favorite_flg:boolean):void=>{
    request_states.favorite_flg = new_favorite_flg
    
  }
  const update_kento = (new_kento:string):void=>{
    request_states.kento = new_kento
  }

  const request_methods = { 'change_button':          change_button,
                            'fetch_kentos' :          fetch_kentos,
                            'post_kentos'  :          post_kentos,
                            'fetch_kentos_interval':  fetch_kentos_interval,
                            'update_favorite_flg':    update_favorite_flg,
                            'update_kento':           update_kento,}
  return { request_states, request_methods,}
}