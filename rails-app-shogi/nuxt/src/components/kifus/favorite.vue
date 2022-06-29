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

<script setup>

  const emit = defineEmits(['change_favorite'])

  //親コンポーネントからもらうやつら
  const loginFlg = inject('loginFlg')
  const favorite_flg = inject('favorite_flg')
  const processing = inject('processing')

  //メソッド群
  const change_favorite = function(){
    emit('change_favorite', !favorite_flg.value)
  }

</script>

<style lang="scss" scoped>
  .favorite_button{
    margin:0 auto;
    margin-left: 36.5vw;
  }
</style>