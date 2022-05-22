<template>
  <button v-on:click= change_favorite_flg class= favorite_button>
    <div v-if = "favorite_flg.value==true">
      お気に入りから削除 
    </div>
    <div v-else > 
      お気に入りに追加 
    </div>
  </button>
</template>

<script>

export default {
  name: "Favorite",
  inject: {
    favorite_flg:['favorite_flg'],
  },

  methods:{
    change_favorite_flg() {
      this.$emit('change_favorite_flg', !this.favorite_flg.value)
    },
  },

}
</script>

<style lang="scss" scoped>
  .favorite_button{
    margin-left: 36.5vw;
  }
</style>