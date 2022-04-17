<template>
  <g v-for= "n in 81" v-bind:class= "class_name(n)" fill="transparent">
    <rect v-bind:x= "x+34*compute_i(n)" v-bind:y= "y+34*(compute_j(n)-1)" width="34" height="34" stroke="#000000" stroke-width="0.5"></rect>
    <SetContents v-bind:x= "x+34*compute_i(n)" v-bind:y= "y+34*(compute_j(n)-1)" v-bind:text= "board_text.value[compute_j(n)-1][compute_i(n)]" v-bind:flg= "board_flg.value[compute_j(n)-1][compute_i(n)]" ></SetContents>
  </g>
</template>

<script>
import SetContents from './set_contents.vue'

export default {

  components: {
    SetContents
  },

  props:["board_margin_lr","board_margin_ud"],

  inject: {
    board_flg:['board_flg'],
    board_text:['board_text'],
  },

  data(){
    return{
      x: this.board_margin_lr-0,
      y: this.board_margin_ud-0,
    }
  },
  methods:{

    class_name(n){
      return (9-this.compute_i(n))+"_"+this.compute_j(n)
    },
    compute_i(n){
      return Math.floor((n-1)/9)
    },

    compute_j(n){
      return (n-1)%9+1
    }
  },
}
</script>