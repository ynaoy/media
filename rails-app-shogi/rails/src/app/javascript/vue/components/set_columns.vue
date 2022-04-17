<template>
  <text v-for= "i in 9" v-bind:x= "column['x']+(i-1)*34" v-bind:y= "column['y']" size=9 font-size=9 text-anchor=middle> {{10-i}} </text>
  <text v-for= "i in 9" v-bind:x= "index['x']" v-bind:y= "index['y']+(i-1)*34" size=9 font-size=9 text-anchor=middle> {{y_columns[i-1]}} </text>
</template>

<script>
export default {

  props:["board_margin_lr","board_margin_ud"],

  data(){
    return{
      y_columns: ["一","二","三","四","五","六","七","八","九"],

      column: {
        x: this.board_margin_lr-0+17,
        y: this.board_margin_ud-2
      },
      index: {
        x: this.board_margin_lr-0+311,
        y: this.board_margin_ud-0+20
      }
    }
  },
}
</script>