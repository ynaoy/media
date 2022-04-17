<template>
  <text v-if= "flg<=1" font-family="serif" font-size="24" style="transform-origin:left top;"
    text-anchor="middle" size="20" anchor="middle" fill="#000000" v-bind:x= "x+17" v-bind:y= "y-0+27">{{ text }}</text>
  <text v-if= "flg==2" font-family="serif" font-size="24" v-bind:style= "make_reverce(x+17,y+17)"
    text-anchor="middle" size="20" anchor="middle" fill="#000000" v-bind:x= "x+17" v-bind:y= "y-0+27" transform=rotate(180)>{{ text }}</text>
</template>

<script>

export default {

  props:["x","y","text","flg"],

  methods:{
    make_reverce(cx,cy){
      return "transform-origin:"+cx+"px"+" "+cy+"px"+";"
    }
  },
}
</script>