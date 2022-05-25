<template>
  <div :class ="'sub_board sub_id-'+sub_board_id" >
    <div v-for= "(key,n) in 8" :key="key" id="sub_cell">
      {{ sub_board_text[sub_board_id][n] }} <span id="num"> {{ process_num(sub_board_num[sub_board_id][n]) }} </span>
    </div>
  </div>
</template>

<script>

import { inject } from 'vue'
import  subBoardObject from '../composables/subBoardObject'

export default {

  name: "subBoard",

  setup(props,context){

    ////リアクティブな変数群とメソッド群
    const sub_board_text = inject('sub_board_text')
    const sub_board_num  = inject('sub_board_num')
    const sub_board_id   = inject('sub_board_id')
    const { sub_board_methods } = subBoardObject(sub_board_text, sub_board_num, sub_board_id)

    //このコンポーネントで使うメソッド
    const process_num = sub_board_methods['process_num']

    return {  sub_board_text, sub_board_num, sub_board_id,
              process_num }
  }

}
</script>

<style lang="scss" scoped>
  .sub_board{
    display: grid;
    place-content: center;
    grid-template-columns: 2.554vw 2.554vw;
    grid-template-rows: 2.554vw 2.554vw 2.554vw 2.554vw;
    gap: 0.15vw 1.503vw;
    border: 2px solid #7F5E1E;
    margin: 0 0.751vw;
    margin-bottom:1.878vw;
    width: 9.016vw;
    height: 11.27vw;
    background-color: #E3A936;
    &.sub_id-0{
      margin-bottom:1.878vw;
    }
    &.sub_id-1{
      margin-top:1.503vw;
    }
  }
  #sub_cell{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.803vw;
    font-family:serif;
  }
  #num{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.902vw;
  }
</style>