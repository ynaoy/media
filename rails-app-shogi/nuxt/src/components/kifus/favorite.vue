<template>
  <button v-if = "loginFlg"
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

<script lang="ts" setup>
  import { Ref } from 'vue'

  const emit = defineEmits(['change_favorite'])

  //親コンポーネントからもらうやつら
  const loginFlg: boolean = inject('loginFlg')
  const favorite_flg: Ref<boolean> = inject('favorite_flg')
  const processing: boolean = inject('processing')

  //メソッド群
  const change_favorite = function(){
    emit('change_favorite', !favorite_flg.value)
  }
  
  defineExpose({ loginFlg, favorite_flg, processing, change_favorite })
</script>

<style lang="scss" scoped>
  .favorite_button{
    margin:0 auto;
    margin-left: 36.5vw;
  }
</style>