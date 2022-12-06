<template>
  <div class = "kifu_wrapper">
    <Board></Board>
    <Favorite @change_favorite = "change_button" ></Favorite>
    <Admin @update_state= "update_board"></Admin>
  </div>
</template>

<script setup>
  import { ref, provide, toRefs  } from 'vue'
  import { kifuObject } from '../../composables/kifus/kifuObject'
  import { requestObject } from '../../composables/kifus/requestObject'
  import { provideObject } from '../../composables/kifus/provideObject'
  import Board from './board.vue'
  import Admin from './admin.vue'
  import Favorite from './favorite.vue'

  //親コンポーネントから貰う奴ら。
  const { kifu_data } = defineProps(["kifu_data"])
  const csrf_token = inject('csrf_token')
  const loginFlg = inject('loginFlg')

  //リアクティブな変数群とメソッド群
  const { kifu_states, kifu_methods } = kifuObject(kifu_data)
  const { request_states, request_methods } = requestObject(kifu_data, csrf_token)

  //子コンポーネントに渡す変数群
  provideObject(toRefs(kifu_states))
  provideObject(toRefs(request_states))
  provide('loginFlg', loginFlg)
  provide('player1',  kifu_data.player1)
  provide('player2',  kifu_data.player2)
  provide('my_kifu',  kifu_data.my_kifu)
  provide('post_kentos',           request_methods['post_kentos'] ) 
  provide('fetch_kentos_interval', request_methods['fetch_kentos_interval']) 

  //このコンポーネントで使うメソッド
  const update_board = kifu_methods['update_board']
  const change_button = request_methods['change_button']

  defineExpose({ kifu_states, request_states, update_board, change_button })
</script>
