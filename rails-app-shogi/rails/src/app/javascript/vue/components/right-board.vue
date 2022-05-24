<template>
  <div id="right_board">
  <div>
    <p id="player"> 先手:  {{ player1 }}</p>
    <p id="player"> 後手:  {{ player2 }}</p>
  </div>  
  <subBoard></subBoard>
</div>
</template>

<script>

import { provide, inject } from 'vue'
import subBoard from './sub-board.vue'

export default {

  name: "rightBoard",
  
  components: {
    subBoard
  },

  setup(props,context){

    //親コンポーネントから貰う変数群
    const sub_board_text =  inject('sub_board_text')
    const sub_board_num =   inject('sub_board_num')
    const player1 =         inject('player1')
    const player2 =         inject('player2')

    //子コンポーネントに渡す変数群
    provide('sub_board_text', sub_board_text)
    provide('sub_board_num',  sub_board_num)
    provide('sub_board_id',  0)

    return{player1, player2}
  }

}
</script>

<style lang="scss" scoped>
  #right_board{
    display: grid;
    align-content: end;
  }
  #player{
    font-size: 0.826vw;
    margin: 0.751vw;
  }
</style>