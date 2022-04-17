<template>
  <svg id ="board" version="1.1" xmlns="http://www.w3.org/2000/svg" v-bind:width="306+board_margin_lr*2" height="326">
    <rect v-bind:width="306+board_margin_lr*2" height="326" x="0" y="0" fill="#ffc107"></rect>
    <rect v-bind:width="306" height="306" v-bind:x="board_margin_lr" v-bind:y="board_margin_ud" stroke="#000000" fill="transparent" stroke-width="1"></rect>
    <circle r="1.8" v-bind:cx="board_margin_lr+102" v-bind:cy="board_margin_ud+102" fill="#000000"></circle>
    <circle r="1.8" v-bind:cx="board_margin_lr+102" v-bind:cy="board_margin_ud+204" fill="#000000"></circle>
    <circle r="1.8" v-bind:cx="board_margin_lr+204" v-bind:cy="board_margin_ud+102" fill="#000000"></circle>
    <circle r="1.8" v-bind:cx="board_margin_lr+204" v-bind:cy="board_margin_ud+204" fill="#000000"></circle>

    <text id="player1" font-size="11" v-bind:x="board_margin_lr-0+306+15" v-bind:y="board_margin_ud-0-sub_board_height+275"> 先手: {{ player1 }}</text>
    <text id="player2" font-size="11" v-bind:x="board_margin_lr-0+306+15" v-bind:y="board_margin_ud-0-sub_board_height+296"> 後手: {{ player2 }}</text>

    <g v-if= "sub_board_width<board_margin_lr" class=sente_komadai fill="transparent">
      <rect v-bind:width= "sub_board_width" v-bind:height= "sub_board_height" v-bind:x= "board_margin_lr-0+306+15" v-bind:y= "board_margin_ud-0-sub_board_height+306"
        stroke="#000000" fill="transparent" stroke-width="1"></rect>
        <g v-for= "n in 8">
            <SubBoard v-bind:x= "board_margin_lr-0+341+(55*((n-1)%2))" v-bind:y= "board_margin_ud-sub_board_height+336+(35*Math.floor((n-1)/2))" v-bind:text= "this.sub_board_text.value[0][n-1]" v-bind:num= "this.sub_board_num.value[0][n-1]" ></SubBoard>
        </g>
    </g>
    <g v-if= "sub_board_width<board_margin_lr" class=gote_komadai fill="transparent">
      <rect v-bind:width= "sub_board_width" v-bind:height= "sub_board_height" v-bind:x="board_margin_lr-0-sub_board_width-15" v-bind:y="board_margin_ud-0+10"
        stroke="#000000" fill="transparent" stroke-width="1"></rect>
        <g v-for= "n in 8">
            <SubBoard v-bind:x= "board_margin_lr-sub_board_width+5+(55*((n-1)%2))" v-bind:y= "board_margin_ud-0+40+(35*Math.floor((n-1)/2))" v-bind:text= "this.sub_board_text.value[1][n-1]" v-bind:num= "this.sub_board_num.value[1][n-1]"></SubBoard>
        </g>
    </g>
    <SetColumns v-bind:board_margin_lr= "board_margin_lr" v-bind:board_margin_ud= "board_margin_ud"></SetColumns>
    <SetBoard v-bind:board_margin_lr= "board_margin_lr" v-bind:board_margin_ud= "board_margin_ud"></SetBoard>
    </svg>
</template>

<script>

import { computed } from 'vue'
import SubBoard from './sub_board.vue'
import SetColumns from './set_columns.vue'
import SetBoard from './set_board.vue'

export default {

  components: {
    SubBoard,
    SetColumns,
    SetBoard
  },

  inject: {
    board_margin_lr:['board_margin_lr'],
    board_margin_ud:['board_margin_ud'],
    sub_board_width:['sub_board_width'],
    sub_board_height:['sub_board_height'],
    board_flg:['board_flg'],
    board_text:['board_text'],
    sub_board_text:['sub_board_text'],
    sub_board_num: ['sub_board_num'],
    player1: ['player1'],
    player2: ['player2'],
  },

  provide() {
    return {
      board_flg: computed(() => this.board_flg.value),
      board_text: computed(() => this.board_text.value),
    }
  },
  data(){
    return{
      index:0
    }
  },
}
 </script>