<template>
  <Board></Board>
  <Favorite v-on:change_favorite = "change_button" ></Favorite>
  <Admin v-on:update_state= "update_board"></Admin>
</template>

<script>
import { ref, provide, toRefs  } from 'vue'
import kifuObject from '../composables/kifuObject'
import requestObject from '../composables/requestObject'
import provideObject from '../composables/provideObject'
import axios from 'axios'
import Board from './board.vue'
import Admin from './admin.vue'
import Favorite from './favorite.vue'

export default {

  name: "app",

  components: {
    Board,
    Admin,
    Favorite
  },

  props:["kifuText","kifuFlg","favoriteFlg","kifuId","player1","player2"],

  setup (props,context) {

    //リアクティブな変数群とメソッド群
    const { kifu_states, kifu_methods } = kifuObject(props)
    const { request_states, request_methods } = requestObject(props)

    //子コンポーネントに渡す変数群
    provideObject(toRefs(kifu_states))
    provideObject(toRefs(request_states))
    provide('player1',        props.player1)
    provide('player2',        props.player2)
  
    //このコンポーネントで使うメソッド
    const update_board = kifu_methods['update_board']
    const change_button = request_methods['change_button']

    return {
      update_board,
      change_button,
    }
  }
}
</script>
