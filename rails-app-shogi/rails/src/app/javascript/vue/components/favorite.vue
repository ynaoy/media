<template>
  <button v-if = "!isUnderfind(favorite_flg)"
          v-bind:disabled= processing
          v-on:click= change_favorite class= favorite_button >
    <div v-if = "favorite_flg==true">
      お気に入りから削除 
    </div>
    <div v-else > 
      お気に入りに追加 
    </div>
  </button>
</template>

<script>
import { inject } from 'vue'

export default {

  name: "Favorite",

  setup(props, context){

    const favorite_flg = inject('favorite_flg')
    const processing = inject('processing')

    const change_favorite = function(){
      context.emit('change_favorite', !favorite_flg.value)
    }

    const isUnderfind = function(value){
      return typeof(value) == 'undefined'
    }

    return { favorite_flg, processing, change_favorite, isUnderfind }
  },
}
</script>

<style lang="scss" scoped>
  .favorite_button{
    margin-left: 36.5vw;
  }
</style>