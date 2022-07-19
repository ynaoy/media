<template>
  <div>
    <div v-if="check_is_empty(users)">
      <h1> ユーザー </h1>
      <UserItems :users="users"/>
    </div>
    <div v-if="check_is_empty(kifus)">
      <h1> 棋譜 </h1>
      <KifusItems :kifus="kifus"/>
    </div>
    <div v-else>
      <h1 id="no-search"> 「{{ query }}」の検索結果はありません </h1>
    </div>
  </div>
</template>

<script setup>
  import UserItems from './users/user-items.vue'
  import KifusItems from './kifus/kifus-items.vue'
  import { AppHelper } from '../composables/AppHelper'

  // このコンポーネントで使うヘルパー
  const { check_is_empty } = AppHelper()

  // 親コンポーネントから貰う奴ら。
  const loginFlg = inject('loginFlg')
  const admin = inject('admin')
  const user_id = inject('user_id')
  const csrf_token = inject('csrf_token')
  const { search_data, query } = defineProps(['search_data', 'query'])

  // このコンポーネントで使う変数たち
  const users = JSON.parse(search_data.users)
  const kifus = JSON.parse(search_data.kifus)

  // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('loginFlg',loginFlg)
  provide('admin',admin)
  provide('csrf_token',csrf_token)

  defineExpose( { query, users, kifus, } )

</script>

<style scoped>
</style>