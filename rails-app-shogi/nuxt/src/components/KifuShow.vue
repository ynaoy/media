<template>
  <div>
    <Kifu :kifu_data="kifu_data" />
    <kifuTag :tags="JSON.parse(kifu_data.tags)"/>
  </div>
</template>

<script setup>
  import { KifuHelper } from '../composables/KifuHelper'
  import Kifu from './kifus/kifu.vue'
  import KifuTag from './kifus/kifu-tag.vue'

  //このコンポーネントで使うヘルパー
  const { get_kifu } = KifuHelper()
  //親コンポーネントから貰う奴ら。
  const { id } = defineProps(["id"])
  const csrf_token = inject('csrf_token')
  const loginFlg = inject('loginFlg')
  //子コーポネントに流すやつら
  provide('csrf_token',csrf_token)
  provide('loginFlg',loginFlg)
  //APIと通信して棋譜の情報をもらう
  const { kifu_data } = await get_kifu({ id:id }, { "Authorization" :csrf_token })

  defineExpose( { get_kifu, kifu_data } )
</script>

<style scoped>
</style>