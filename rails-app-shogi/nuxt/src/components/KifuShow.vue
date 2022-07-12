<template>
  <div>
    <Kifu :kifu_data="kifu_data" />
    <kifuTag :tags="JSON.parse(kifu_data.tags)"/>
  </div>
</template>

<script setup>
  import Kifu from './kifus/kifu.vue'
  import KifuTag from './kifus/kifu-tag.vue'

  //親コンポーネントから貰う奴ら。
  const { kifu_data } = defineProps(["kifu_data"])
  const csrf_token = inject('csrf_token')
  const loginFlg = inject('loginFlg')

  //子コーポネントに流すやつら
  provide('csrf_token',csrf_token)
  provide('loginFlg',loginFlg)

  defineExpose( { kifu_data } )
</script>

<style scoped>
</style>