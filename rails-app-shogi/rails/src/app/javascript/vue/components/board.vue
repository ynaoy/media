<template>
  <div id="board" >
    <leftBoard></leftBoard>
    <mainBoard></mainBoard>
    <rightBoard></rightBoard>
  </div>
</template>

<script>

import { computed } from 'vue'
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

  inject: {
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
      sub_board_text: computed(() => this.sub_board_text.value),
      sub_board_num: computed(() => this.sub_board_num.value),
      player1: this.player1,
      player2: this.player2,
    }
  },
}
</script>

<style lang="scss" scoped>
  #board{
    display: flex;
    border:  none;
    width: 626px;
    height: 346px;
    background-color: #DCF0BE;
  }
</style>