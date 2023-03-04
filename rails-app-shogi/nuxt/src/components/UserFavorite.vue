<template>
  <div>
    <h1> お気に入り </h1>
    <KifusItems :kifus="favorite_kifus"/>
  </div>
</template>

<script lang="ts" setup>
  import KifusItems from './kifus/kifus-items.vue'
  import { SessionHelper } from '../composables/SessionHelper'

  // 親コンポーネントから貰う奴ら。
  const loginFlg :boolean   = inject('loginFlg')
  const user_id :number     = inject('user_id')
  const csrf_token :string  = inject('csrf_token')
  const { favorite_kifus } = defineProps<{ favorite_kifus: [{ [key:string]: any }]}>()

  // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('csrf_token',csrf_token)
  
  // 使うメソッドをヘルパーからもらう
  const { force_login } = SessionHelper()

  // ログインしていなかったらログインページに飛ばす
  force_login(loginFlg)

  defineExpose( { favorite_kifus, force_login } )

</script>

<style scoped>
</style>