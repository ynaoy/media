<template>
  <div>
    <h1> {{ query }}</h1>
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

<script lang="ts" setup>
  import UserItems from './users/user-items.vue'
  import KifusItems from './kifus/kifus-items.vue'
  import { AppHelper } from '../composables/AppHelper'
  import { Ref } from 'vue'

  // このコンポーネントで使うヘルパー
  const { check_is_empty } = AppHelper()

  // 親コンポーネントから貰う奴ら。
  const loginFlg :boolean  = inject('loginFlg')
  const admin :boolean     = inject('admin')
  const user_id :number    = inject('user_id')
  const csrf_token :string = inject('csrf_token')
  let { users, kifus, query } = 
    defineProps<{ users :Ref<[{ [key:string]: any }]>,
                  kifus :Ref<[{ [key:string]: any }]>,
                  query :Ref<string> }>()

  // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('loginFlg',loginFlg)
  provide('admin',admin)
  provide('csrf_token',csrf_token)

  defineExpose( { query, users, kifus, } )

</script>

<style scoped>
</style>