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

  //リアクティブな変数群
  const state = ref(0)
  const max_state = ref(props.kifuText.length-1)
  const favorite_flg = ref(props.favoriteFlg)
  const processing = ref(false)

  //子コンポーネントに渡す変数群
  provide('state', state)
  provide('max_state', max_state)
  provide('favorite_flg', favorite_flg)
  provide('processing', processing)
  
  //メソッド群

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

  onMounted(set_csrf_token)

  return {
    state,
    max_state,
    favorite_flg,
    processing,
    change_button,
    post_favorite_path,
    delete_favorite_path,
    set_uri,
    set_csrf_token,
  }
},

data() {
    return {
      mode:"",
      //state:0,
      old_state:0,
      //max_state:0,
      //favorite_flg: this.favoriteFlg,
      //processing: false,
      board_text: [],
      board_flg: [],
      sub_board_label:["飛","角","金","銀","桂","香","歩","玉"],
      sub_board_text:[],
      sub_board_num:[],
    }
  },
  provide() {
    return {
      board_flg:      computed(() => this.board_flg),
      board_text:     computed(() => this.board_text),
      //favorite_flg:   computed(() => this.favorite_flg),
      //processing:     computed(() => this.processing),
      //state:          this.state,
      //max_state:      computed(() => this.max_state),
      sub_board_text: computed(() => this.sub_board_text),
      sub_board_num:  computed(() => this.sub_board_num),
      player1: this.player1,
      player2: this.player2,
    }
  },

  methods:{
    update_board(event){
      this.state = event;
      this.board_text = this.kifuText[this.state];
      this.board_flg = this.kifuFlg[this.state];
      this.set_sub_board()
    },

    set_sub_board(){
      this.sub_board_text=[]
      this.sub_board_num=[]
      for (var i=0; i<2; i++){
        var _text = []
        var _num = []
        var _pad =[]
        for(var j=0; j<this.sub_board_label.length;j++){
          if(this.board_flg[9+i][j]==0){
            _pad.push("");
            continue;
          }
          _text.push(this.sub_board_label[j]);
          _num.push(this.board_flg[9+i][j]);
        }
        _text=_text.concat(_pad);
        _num=_num.concat(_pad);
        this.sub_board_text.push(_text);
        this.sub_board_num.push(_num);
      }
    },
  },

  created(){
    this.update_board(0);
  },

}
</script>
