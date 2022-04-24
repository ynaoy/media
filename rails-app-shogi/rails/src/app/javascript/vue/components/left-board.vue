<template>
  <div id="left_board">
    <subBoard1></subBoard1>
  </div>
</template>

<script>

import { computed } from 'vue'
import subBoard1 from './sub-board1.vue'

export default {
  name: "leftBoard",
  components: {
    subBoard1
  },

  inject: {
    sub_board_text:['sub_board_text'],
    sub_board_num: ['sub_board_num'],
  },

  provide() {
    return {
      sub_board_text: computed(() => this.sub_board_text.value),
      sub_board_num: computed(() => this.sub_board_num.value),
    }
  },
}
</script>