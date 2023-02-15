<template>
  <div id ="main_board">
    <setIndex></setIndex>
    <div id="main">
      <div id="inner_board">
        <div v-for="(key,n) in 81" :key="key" :style=setStyle(n) id="cell" >
          {{  board_text[compute_i(n)][compute_j(n)] }}
        </div>
      </div>
      <setColumns></setColumns>
    </div>
  </div>
</template>

<script setup>

  import { inject } from 'vue'
  import { mainBoardObject } from '../../composables/kifus/mainBoardObject'
  import setIndex from './set-index.vue'
  import setColumns from './set-columns.vue'

  //リアクティブな変数群とメソッド群
  const board_text = inject('board_text')
  const board_flg  = inject('board_flg')
  const { main_board_methods } = mainBoardObject(board_text, board_flg)

  //このコンポーネントで使うメソッド
  const compute_i = main_board_methods['compute_i']
  const compute_j = main_board_methods['compute_j']
  const setStyle = main_board_methods['setStyle']

  defineExpose([ board_text, board_flg, setStyle ])

</script>

<style lang="scss" scoped>
  #main_board{
    width: 24.643vw;
    height: 24.643vw;
    background-color: #E3A936;
  }
  #main{
    display: flex;
    border:  none;
  }
  #inner_board{
    display: grid;
    text-align: center;
    grid-template-columns: 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw;
    grid-template-rows: 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw 2.554vw;
    width: 22.99vw;
    height: 22.99vw;
    margin-left: 0.751vw;
    border: 1px solid #4E3B12;
  }
  #cell{
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #7F5E1E;
    font-size: 1.803vw;
    font-family:serif;
  }
</style>