<template>
  <KifusItems :kifus="kifus"/>
</template>

<script lang="ts" setup>
  import KifusItems from './kifus/kifus-items.vue'
  import { SessionHelper } from '../composables/SessionHelper'
  
  // 親コンポーネントから貰う奴ら。
  const loginFlg :boolean =   inject('loginFlg')
  const csrf_token :string =  inject('csrf_token')
  const user_id :number =     inject('user_id')
  const { kifus } = defineProps<{ kifus: [{ [key:string]: any }]}>()

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