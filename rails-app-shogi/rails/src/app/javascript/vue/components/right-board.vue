<template>
  <div id="right_board">
  <div>
    <p id="player"> 先手:  {{ player1 }}</p>
    <p id="player"> 後手:  {{ player2 }}</p>
  </div>  
  <subBoard0></subBoard0>
</div>
</template>

<script>

import { computed } from 'vue'
import subBoard0 from './sub-board0.vue'

export default {
  name: "rightBoard",
  components: {
    subBoard0
  },

  inject: {
    sub_board_text:['sub_board_text'],
    sub_board_num: ['sub_board_num'],
    player1: ['player1'],
    player2: ['player2'],
  },

  provide() {
    return {
      board_flg: computed(() => this.board_flg.value),
      board_text: computed(() => this.board_text.value),
      sub_board_text: computed(() => this.sub_board_text.value),
      sub_board_num: computed(() => this.sub_board_num.value),
    }
  },
}
</script>

<style lang="scss" scoped>
  #right_board{
    display: grid;
    align-content: end;
  }
  #player{
    font-size: 0.826vw;
    margin: 0.751vw;
  }
</style>