<template>
  <rect  :X="x-17" :Y="y-27" width="34" height="34" stroke="#000000" stroke-width="0"></rect>
  <text  font-family="serif" font-size="24" style="transform-origin:left top;" text-anchor="middle" size="20" anchor="middle" fill="#000000" :x="x" :y="y">{{ text }}</text>
  <text  font-family="serif" font-size="12" style="transform-origin:left top;" text-anchor="middle" size="20" anchor="middle" fill="#000000" :x="x-0+20+5" :y="y">{{ processed_num(num) }}</text>
</template>

<script>
export default {
  inject: {
    board_flg:['board_flg'],
    board_text:['board_text'],
  },
  props:["x","y","turn","text","num"],
  methods:{
    processed_num(num){
      if(num!="") return "×"+num
    }
  },
}
</script>