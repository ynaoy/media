<template>
  <div v-if="check_is_empty(users)">

    <Pagination @pageNum = "set_pageNum"
                :items="users" :parPage="parPage" :currentPage="currentPage" />

    <UserItems :users="get_items(users)"/>

    <Pagination @pageNum = "set_pageNum"
                :items="users" :parPage="parPage" :currentPage="currentPage" />

  </div>
</template>

<script setup>
  import UserItems from './users/user-items.vue'
  import { AppHelper } from '../composables/AppHelper'
  import { SessionHelper } from '../composables/SessionHelper'
  import { PaginationObject } from '../composables/PaginationObject'

  // 親コンポーネントから貰う奴ら。
  const loginFlg = inject('loginFlg')
  const admin = inject('admin')
  const csrf_token = inject('csrf_token')
  const { users } = defineProps(['users'])

  // 子コンポーネントに渡す奴ら。
  provide('loginFlg',loginFlg)
  provide('admin',admin)
  provide('csrf_token',csrf_token)

  // このコンポーネントで作成される変数群
  const parPage = 20

  // 使うメソッドをヘルパーからもらう
  const { force_login } = SessionHelper()
  const { check_is_empty } = AppHelper()
  const { currentPage, set_pageNum, get_items} = PaginationObject(parPage)

  // ログインしていなかったらログインページに飛ばす
  force_login(loginFlg)

  defineExpose( { users, check_is_empty } )

</script>

<style scoped>
</style>