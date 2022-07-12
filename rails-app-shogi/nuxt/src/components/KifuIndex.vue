<template>
  <KifusItems :kifus="kifus"/>
</template>

<script setup>
  import KifusItems from './kifus/kifus-items.vue'
  import { SessionHelper } from '../composables/SessionHelper'
  
  // 親コンポーネントから貰う奴ら。
  const loginFlg = inject('loginFlg')
  const user_id = inject('user_id')
  const csrf_token = inject('csrf_token')
  const { kifus } = defineProps(['kifus'])

  // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('csrf_token',csrf_token)

  // 使うメソッドをヘルパーからもらう
  const { force_login } = SessionHelper()

  // ログインしていなかったらログインページに飛ばす
  force_login(loginFlg)

  defineExpose( { kifus, force_login } )

</script>

<style scoped>
</style>