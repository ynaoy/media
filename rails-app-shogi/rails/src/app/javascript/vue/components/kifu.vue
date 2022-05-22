<template>
  <Board></Board>
  <Favorite v-on:change_favorite_flg = "change_button" ></Favorite>
  <Admin v-on:update_state= "update_board"></Admin>
</template>

<script>
import { computed } from 'vue'
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

  data() {
    return {
      mode:"",
      state:0,
      old_state:0,
      max_state:0,
      favorite_flg: this.favoriteFlg,
      processing: false,
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
      favorite_flg:   computed(() => this.favorite_flg),
      processing:     computed(() => this.processing),
      state:          computed(() => this.state),
      max_state:      computed(() => this.max_state),
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

    change_button(event) {
      this.processing = true;
      if(this.favorite_flg){
        this.delete_favorite_path(event)
      }
      else{
        this.post_favorite_path(event)
      }
      setTimeout(function(){
        this.processing = false;
      }.bind(this),1000)
    },

    post_favorite_path(event) {
      axios
        .post(this.set_uri()+'/favorites', {
          'favorite':{'kifu_id': this.kifuId}
        })
        .then((res) => {
          this.favorite_flg = event
        })
        .catch((err) => {
          console.log(err);
        });
    },

    delete_favorite_path(event) {
      axios
        .delete(this.set_uri()+'/favorites', {data:{
          'favorite':{'kifu_id': this.kifuId}}
        })
        .then((res) => {
          this.favorite_flg = event
        })
        .catch((err) => {
          console.log(err);
        });
    },

    set_uri(){
      return `${location.protocol}//${location.host}`
    },

    set_csrf_token(){
      let csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
      axios.defaults.headers.common = {
        "X-CSRF-TOKEN": csrfToken
      };
    }
  },

  created(){
    this.update_board(0);
    this.max_state=this.kifuText.length-1;
  },
  mounted(){
    this.set_csrf_token()
  },

}
</script>
