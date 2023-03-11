<template>
  <div id="board" >
    <leftBoard></leftBoard>
    <mainBoard></mainBoard>
    <rightBoard></rightBoard>
  </div>
</template>

<script lang="ts" setup>

  import leftBoard from './left-board.vue'
  import rightBoard from './right-board.vue'
  import mainBoard from './main-board.vue'
  import { ComputedRef, Ref } from 'vue'

  //親コンポーネントから貰う変数群
  const board_flg: Ref<number[][]>            = inject('board_flg')
  const board_text: Ref<string[][]>           = inject('board_text')
  const sub_board_text: Ref<string[][]>       = inject('sub_board_text')
  const sub_board_num: Ref<number[][]>        = inject('sub_board_num')
  const player1: ComputedRef<string>          = inject('player1')
  const player2: ComputedRef<string>          = inject('player2')
  const my_kifu: ComputedRef<boolean>         = inject('my_kifu')
  const kento: null|string|{[key:string]:any} = inject('kento')
  const state: Ref<number>                    = inject('state')
  const post_kentos: ()=>void                 = inject('post_kentos')
  const fetch_kentos_interval: <T>(interval_ms:number, timer?:T)=> NodeJS.Timer|number
    = inject('fetch_kentos_interval')

  //子コンポーネントに渡す変数群
  provide('board_text',     board_text)
  provide('board_flg',      board_flg)
  provide('sub_board_text', sub_board_text)
  provide('sub_board_num',  sub_board_num)
  provide('player1',        player1)
  provide('player2',        player2)
  provide('my_kifu',        my_kifu)  
  provide('kento',          kento)
  provide('state',          state)
  provide('post_kentos',    post_kentos )
  provide('fetch_kentos_interval', fetch_kentos_interval) 
  
</script>

<style lang="scss" scoped>
  #board{
    display: flex;
    border:  none;
    width: 49.032vw;
    height: 25.995vw;
    background-color: #DCF0BE;
  }
</style>