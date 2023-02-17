<template>
  <div>
    <Kifu :kifu_data="kifu_data" />
    <kifuTag :tags="JSON.parse(kifu_data.tags)"/>
  </div>
</template>

<script lang="ts" setup>
  import Kifu from './kifus/kifu.vue'
  import KifuTag from './kifus/kifu-tag.vue'

  //親コンポーネントから貰う奴ら。
  const props = defineProps<{ kifu_data: { [key:string]: any} }>()
  const kifu_data = toRef(props,'kifu_data')
  const csrf_token:string = inject('csrf_token')
  const loginFlg:boolean = inject('loginFlg')

  //子コーポネントに流すやつら
  provide('csrf_token',csrf_token)
  provide('loginFlg',loginFlg)

  defineExpose( { kifu_data } )
</script>

<style scoped>
</style>