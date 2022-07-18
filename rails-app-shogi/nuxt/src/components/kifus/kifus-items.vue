<template>
  <div v-if="check_is_empty(kifus)">

    <Pagination @pageNum = "set_pageNum"
                :items="kifus" :parPage="parPage" :currentPage="currentPage" />

    <KifuItems :kifus="get_items"/>

    <Pagination @pageNum = "set_pageNum"
                :items="kifus" :parPage="parPage" :currentPage="currentPage" />

  </div>
</template>

<script setup>
  import KifuItems from './kifu-items.vue'
  import Pagination from '../Pagination.vue'
  import { AppHelper } from '../../composables/AppHelper'
  import { PaginationObject } from '../../composables/PaginationObject'

  // 親コンポーネントから貰う奴ら。
  const loginFlg = inject('loginFlg')
  const user_id = inject('user_id')
  const csrf_token = inject('csrf_token')
  const { kifus } = defineProps(['kifus'])

  // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('csrf_token',csrf_token)

  // このコンポーネントで作成される変数群
  const parPage = 20

  // 使うメソッドをヘルパーからもらう
  const { check_is_empty } = AppHelper()
  const { currentPage, set_pageNum, get_items} = PaginationObject(kifus, parPage)

  //このコンポーネントで使うメソッド

  defineExpose( { kifus ,check_is_empty } )

</script>

<style scoped>
</style>