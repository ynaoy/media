<template>
  <div id="board" >
    <leftBoard></leftBoard>
    <mainBoard></mainBoard>
    <rightBoard></rightBoard>
  </div>
</template>

<script>

import { provide, inject } from 'vue'
import leftBoard from './left-board.vue'
import rightBoard from './right-board.vue'
import mainBoard from './main-board.vue'

export default {

  name: "Board",

  components: {
    leftBoard,
    rightBoard,
    mainBoard
  },

  setup(props,context){

    //親コンポーネントから貰う変数群
    const board_flg      = inject('board_flg')
    const board_text     = inject('board_text')
    const sub_board_text = inject('sub_board_text')
    const sub_board_num  = inject('sub_board_num')
    const player1        = inject('player1')
    const player2        = inject('player2')

    //子コンポーネントに渡す変数群
    provide('board_text',     board_text)
    provide('board_flg',      board_flg)
    provide('sub_board_text', sub_board_text)
    provide('sub_board_num',  sub_board_num)
    provide('player1',        player1)
    provide('player2',        player2)
  }

}
</script>

<style lang="scss" scoped>
  #board{
    display: flex;
    border:  none;
    width: 47.032vw;
    height: 25.995vw;
    background-color: #DCF0BE;
  }
</style>