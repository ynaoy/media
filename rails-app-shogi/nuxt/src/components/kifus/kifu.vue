<template>
  <div class = "kifu_wrapper">
    <Board></Board>
    <Favorite @change_favorite = "change_button" ></Favorite>
    <Admin @update_state= "update_board"></Admin>
  </div>
</template>

<script lang="ts" setup>
  import { ref, provide, toRefs, computed  } from 'vue'
  import { kifuObject } from '../../composables/kifus/kifuObject'
  import { requestObject } from '../../composables/kifus/requestObject'
  import { provideObject } from '../../composables/kifus/provideObject'
  import Board from './board.vue'
  import Admin from './admin.vue'
  import Favorite from './favorite.vue'

  //親コンポーネントから貰う奴ら。
  const props = defineProps<{ kifu_data: { [key:string]: any} }>()
  const kifu_data = toRef(props,'kifu_data')
  const csrf_token:string = inject('csrf_token')
  const loginFlg:boolean = inject('loginFlg')

  //リアクティブな変数群とメソッド群
  const { kifu_states, kifu_methods } = kifuObject(kifu_data)
  const { request_states, request_methods } = requestObject(kifu_data, csrf_token)

  //子コンポーネントに渡す変数群
  provideObject(toRefs(kifu_states))
  provideObject(toRefs(request_states))
  provide('loginFlg', loginFlg)
  provide('player1',  computed(()=> kifu_data.value.player1))
  provide('player2',  computed(()=> kifu_data.value.player2))
  provide('my_kifu',  computed(()=> kifu_data.value.my_kifu))
  provide('post_kentos',           request_methods['post_kentos'] ) 
  provide('fetch_kentos_interval', request_methods['fetch_kentos_interval']) 

  //このコンポーネントで使うメソッド
  const update_board = kifu_methods['update_board']
  const change_button = request_methods['change_button']
  const update_favorite_flg = request_methods['update_favorite_flg']
  const update_kento = request_methods['update_kento']

  watch( kifu_data,()=>{  update_board(0)
                          update_favorite_flg(kifu_data.value.favorite_flg)
                          update_kento(kifu_data.value.kento)
                        })

  defineExpose({  kifu_data, kifu_states, request_states, 
                  update_board, update_favorite_flg, update_kento, change_button })
</script>

