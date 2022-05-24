<template>
  <Board></Board>
  <Favorite v-on:change_favorite = "change_button" ></Favorite>
  <Admin v-on:update_state= "update_board"></Admin>
</template>

<script>
import { computed, ref, provide, onMounted } from 'vue'
import axios from 'axios'
import Board from './board.vue'
import Admin from './admin.vue'
import Favorite from './favorite.vue'

export default {

  name: "app",

  components: {
    Board,
    Admin,
    Favorite
  },

  props:["kifuText","kifuFlg","favoriteFlg","kifuId","player1","player2"],

  setup (props,context) {

    //リアクティブでない変数群
    const sub_board_label = ["飛","角","金","銀","桂","香","歩","玉"]

    //リアクティブな変数群
    const state =          ref(0)
    const max_state =      ref(props.kifuText.length-1)
    const favorite_flg =   ref(props.favoriteFlg)
    const processing =     ref(false)
    const board_text =     ref([]) //[n][8][8]
    const board_flg =      ref([]) //[n][10][8] ※[n][9][8]と[n][10][8]は持ち駒の枚数
    const sub_board_text = ref([]) //[2][8]
    const sub_board_num =  ref([]) //[2][8]

    //子コンポーネントに渡す変数群
    provide('state',          state)
    provide('max_state',      max_state)
    provide('favorite_flg',   favorite_flg)
    provide('processing',     processing)
    provide('board_text',     board_text)
    provide('board_flg',      board_flg)
    provide('sub_board_text', sub_board_text)
    provide('sub_board_num',  sub_board_num)
    provide('player1',        player1)
    provide('player2',        player2)
  
    //メソッド群

    //'update_state'イベントが発火されたら、
    //画面に表示されるリアクティブな変数を更新する
    const update_board= function(event){
      state.value = event;
      board_text.value = props.kifuText[state.value];
      board_flg.value = props.kifuFlg[state.value];
      set_sub_board()
    }

    //sub_board_textとsub_board_numを更新する
    //表示される駒をtextsに、その枚数をnumsに入れる。padsには表示されない部分を数合わせとして入れる
    //それを先手と後手二つ分用意する
    const set_sub_board= function(){
      sub_board_text.value=[]
      sub_board_num.value=[]
      for (let i=0; i<2; i++){
        let texts = []
        let nums = []
        let pads =[]
        for(let j=0; j<sub_board_label.length;j++){
          if(board_flg.value[9+i][j]==0){
            pads.push("");
            continue;
          }
          texts.push(sub_board_label[j]);
          nums.push(board_flg.value[9+i][j]);
        }
        texts= texts.concat(pads);
        nums=  nums.concat(pads);
        sub_board_text.value.push(texts);
        sub_board_num.value.push(nums);
      }
    }

    //"change_favorite"イベントで発火
    //お気に入りフラグがtrueならdeleteメソッドを、falseならpostメソッドを飛ばして、お気に入りフラグを更新する
    //processing.valueは子コンポーネントに飛ばして処理中ならお気に入りbuttonを押せなくする
    const change_button = function(event) {
      processing.value = true;

      if(favorite_flg.value){
        delete_favorite_path(event, props.kifuId)
      }
      else{
        post_favorite_path(event, props.kifuId)
      }

      setTimeout(function(){
        processing.value = false;
      }.bind(this),1000)
    }

    //favoritesコントローラーにpostメソッドを飛ばしてDBと通信
    const post_favorite_path= function(event, kifu_id){
      axios
        .post(set_uri()+'/favorites', {
          'favorite':{'kifu_id': kifu_id}
        })
        .then((res) => {
          favorite_flg.value = event
        })
        .catch((err) => {
          console.log(err)
        });
    }

    //favoritesコントローラーにdeleteメソッドを飛ばしてDBと通信
    const delete_favorite_path= function(event, kifu_id){
      axios
        .delete(set_uri()+'/favorites', { data:{
          'favorite':{'kifu_id': kifu_id}}
        })
        .then((res) => {
          favorite_flg.value = event
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const set_uri= function(){
      return `${location.protocol}//${location.host}`
    }

    //csrfTokenを設定して、CSRF対策を回避する
    //CSRFとは？→ https://www.trendmicro.com/ja_jp/security-intelligence/research-reports/threat-solution/csrf.html
    const set_csrf_token= function(){
      let csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
      axios.defaults.headers.common = {
        "X-CSRF-TOKEN": csrfToken
      };
    }

    //作成されると同時に実行される奴ら
    onMounted(set_csrf_token)
    update_board(0)

    return {
      state,
      max_state,
      favorite_flg,
      processing,
      board_text,
      board_flg,
      sub_board_text,
      sub_board_num,

      update_board,
      set_sub_board,
      change_button,
      post_favorite_path,
      delete_favorite_path,
      set_uri,
      set_csrf_token,
    }
  }
}
</script>
