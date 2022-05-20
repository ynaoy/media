<template>
  <Board></Board>
  <Admin v-on:update_state= "state = $event, update_board()"></Admin>
</template>

<script>

import { computed } from 'vue'
import Board from './board.vue'
import Admin from './admin.vue'

export default {

  name: "app",

  components: {
    Board,
    Admin
  },

  props:["kifuText","kifuFlg","favorite_flg","player1","player2"],

  data() {
    return {
      mode:"",
      state:0,
      old_state:0,
      max_state:0,
      board_text: [],
      board_flg: [],
      favorite_flg: null,
      sub_board_label:["飛","角","金","銀","桂","香","歩","玉"],
      sub_board_text:[],
      sub_board_num:[],

    }
  },
  provide() {
    return {
      board_flg:      computed(() => this.board_flg),
      board_text:     computed(() => this.board_text),
      favorite_flg:   computed(() => this.favorite_fig),
      state:          computed(() => this.state),
      max_state:      computed(() => this.max_state),
      sub_board_text: computed(() => this.sub_board_text),
      sub_board_num:  computed(() => this.sub_board_num),
      player1: this.player1,
      player2: this.player2,
    }
  },

  methods:{
    update_board(){
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
    this.update_board();
    this.max_state=this.kifuText.length-1;
  }

}
</script>
