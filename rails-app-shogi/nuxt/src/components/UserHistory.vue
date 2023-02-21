<template>
  <div>
    <h1> 閲覧履歴 </h1>
    <HistoryItems :items="hist_data" />
  </div>
</template>

<script lang="ts" setup>
  import  HistoryItems from './users/history-items.vue'
  import { SessionHelper } from '../composables/SessionHelper'

  // 親コンポーネントから貰う奴ら。
  const user_id:number    = inject('user_id')  
  const csrf_token:string = inject('csrf_token')
  const loginFlg:boolean  = inject('loginFlg')
  const { hist_data } = defineProps<{ hist_data: [{[key:string]: any}] }>()

  // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('csrf_token',csrf_token)
  
  // 使うメソッドをヘルパーからもらう
  const { force_login } = SessionHelper()

  // ログインしていなかったらログインページに飛ばす
  force_login(loginFlg)

  defineExpose( { hist_data } )

</script>

<style scoped>
</style>