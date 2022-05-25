<template>
  <div id ="main_board">
    <setIndex></setIndex>
    <div id="main">
      <div id="inner_board">
        <div v-for="(key,n) in 81" :key="key" :style=setStyle(n) id="cell" >
          {{ board_text[compute_i(n)][compute_j(n)] }}
        </div>
      </div>
      <setColumns></setColumns>
    </div>
  </div>
</template>

<script>

import { inject } from 'vue'
import setIndex from './set-index.vue'
import setColumns from './set-columns.vue'

export default {

  name: "mainBoard",

  components: {
    setIndex,
    setColumns,
  },

  setup(props,context){

    //親コンポーネントから貰う変数群
    const board_text = inject('board_text')
    const board_flg  = inject('board_flg')

    //メソッド群
    // nには1..81以下の整数が入る。それをlist[i][j]の形に変換する

    const compute_i= function(n){
      return Math.floor((n)/9)
    }

    const compute_j= function(n){
      return (n)%9
    }

    const setStyle= function(n){
      if(board_flg.value[compute_i(n)][compute_j(n)] == 2){
        return "transform: scale(-1,-1);"
      }
    }

    return {  board_text,
              compute_i, compute_j, setStyle }
  }
}
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