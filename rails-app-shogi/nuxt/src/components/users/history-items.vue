<template>
  <div>
    <div v-for="(item,key) in items" :key="key" >
      <h3 v-if ="display_flg(item.watch_at)" >
        {{ display_day(item.watch_at) }} 
      </h3>
      <kifuUrl v-if="kifu_flg(item.id)" :kifu="item"/>
    </div>
  </div>
</template>

<script setup>
  import KifuUrl from '../kifus/kifu-url.vue'
  import { AppHelper } from '../../composables/AppHelper'
  import { HistoryHelper } from '../../composables/HistoryHelper'

  //このコンポーネントで使うヘルパー
  const { timewithzone_to_str } = AppHelper()
  const { display_day, display_flg, kifu_flg } = HistoryHelper()

  // 親コンポーネントから貰う奴ら。
  const user_id = inject('user_id')
  const csrf_token = inject('csrf_token')
  const { items } = defineProps(['items'])

  // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('csrf_token',csrf_token)

  defineExpose( { items } )

</script>

<style scoped>
</style>