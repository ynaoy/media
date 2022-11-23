<template>
  <div id="right_board">
    <KifuKento></KifuKento> 
    <div>
      <p id="player"> 先手:  {{ player1 }}</p>
      <p id="player"> 後手:  {{ player2 }}</p>
    </div>  
    <subBoard></subBoard>
  </div>
</template>

<script setup>
  import subBoard from './sub-board.vue'
  import KifuKento from './kifu-kento.vue'
  //親コンポーネントから貰う変数群
  const sub_board_text =  inject('sub_board_text')
  const sub_board_num =   inject('sub_board_num')
  const player1 =         inject('player1')
  const player2 =         inject('player2')
  const my_kifu        = inject('my_kifu')
  const kento          = inject('kento')

  //子コンポーネントに渡す変数群
  provide('sub_board_text', sub_board_text)
  provide('sub_board_num',  sub_board_num)
  provide('sub_board_id',   0)
  provide('my_kifu',        my_kifu)  
  provide('kento',          kento)
  
</script>

<style lang="scss" scoped>
  #right_board{
    display: grid;
    align-content: end;
    width:14vw;
  }
  #player{
    font-size: 0.826vw;
    margin: 0.751vw;
  }
</style>