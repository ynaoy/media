<template>
  <div id ="main_board">
    <setIndex></setIndex>
    <div id="main">
      <div id="inner_board">
        <div v-for="n in 81" id="cell" :style=setStyle(n)>
          {{ this.board_text.value[compute_i(n)][compute_j(n)] }}
        </div>
      </div>
      <setColumns></setColumns>
    </div>
  </div>
</template>

<script>
import setIndex from './set-index.vue'
import setColumns from './set-columns.vue'

export default {
  name: "mainBoard",
  components: {
    setIndex,
    setColumns,
  },

  inject: {
    board_flg:['board_flg'],
    board_text:['board_text'],
  },

  methods:{
    compute_i(n){
      return Math.floor((n-1)/9)
    },

    compute_j(n){
      return (n-1)%9
    },
    setStyle(n){
      if(this.board_flg.value[this.compute_i(n)][this.compute_j(n)]==2){
        return "transform: scale(-1,-1);"
      }
    }
  },
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