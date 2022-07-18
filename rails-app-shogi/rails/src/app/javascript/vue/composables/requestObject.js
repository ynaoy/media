
import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default function requestObject(props){

  //リアクティブな変数群
  const request_states =reactive({
    favorite_flg: props.favoriteFlg,
    processing: false
  })

  //メソッド群
    
  //"change_favorite"イベントで発火
  //processing.valueは子コンポーネントに飛ばして処理中ならお気に入りbuttonを押せなくする
  const change_button = async function(event){
    request_states.processing = true;
    await send_favorites(event, props.kifuId)
    request_states.processing = false;
  }

  //favoritesコントローラーに対して、
  //お気に入りフラグがtrueならdeleteメソッドを、falseならpostメソッドを飛ばして、お気に入りフラグを更新する
  const send_favorites = async function(event, kifu_id){
    let request

    if(request_states.favorite_flg){
      request = send_delete('favorites', {'favorite': {'kifu_id': kifu_id} })
    }
    else{
      request = send_post('favorites', {'favorite': {'kifu_id': kifu_id} })
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
  const send_post = function(controller, params){
    return axios.post(set_url(controller), params)
  }

  //コントローラーにdeleteメソッドを飛ばしてDBと通信
  const send_delete = function(controller, params){
    return axios.delete(set_url(controller), { 'data': params })
  }

  const set_url = function(controller){
    return `${location.protocol}//${location.host}/${controller}`
  }
  
  //csrfTokenを設定して、CSRF対策を回避する
  //CSRFとは？→ https://www.trendmicro.com/ja_jp/security-intelligence/research-reports/threat-solution/csrf.html
  const set_csrf_token = function(){
    let csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
    axios.defaults.headers.common = {
      "X-CSRF-TOKEN": csrfToken
    };
  }
  
  //作成されると同時に実行される奴ら
  onMounted(set_csrf_token)

  const request_methods = { 'change_button': change_button }
  return { request_states, request_methods }
}