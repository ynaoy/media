<template>
  <div id="left_board">
    <subBoard></subBoard>
  </div>
</template>

<script>

import { provide, inject } from 'vue'
import subBoard from './sub-board.vue'

export default {

  name: "leftBoard",

  components: {
    subBoard
  },

  setup(props,context){

    //親コンポーネントから貰う変数群
    const sub_board_text = inject('sub_board_text')
    const sub_board_num  = inject('sub_board_num')

    //子コンポーネントに渡す変数群
    provide('sub_board_text', sub_board_text)
    provide('sub_board_num',  sub_board_num)
    provide('sub_board_id',  1)
  }

}
</script>