<template>
  <div v-if="kifus_is_empty()">

    <Pagination @pageNum = "set_pageNum"
                :items="kifus" :parPage="parPage" :currentPage="currentPage" />

    <KifuItems :kifus="get_items"/>

    <Pagination @pageNum = "set_pageNum"
                :items="kifus" :parPage="parPage" :currentPage="currentPage" />

  </div>
</template>

<script setup>
  import KifuItems from './kifus/kifu-items.vue'
  import PaginationObject from '../composables/PaginationObject'

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
  const { force_login } = SessionHelper()
  const { currentPage, set_pageNum, get_items} = PaginationObject(kifus, parPage)

  // ログインしていなかったらログインページに飛ばす
  force_login(loginFlg)

  //このコンポーネントで使うメソッド

  //kifusが空かどうか判定
  const kifus_is_empty = ()=>{
    return (kifus != undefined) && (kifus.length != 0) 
  }
  defineExpose( { kifus, kifus_is_empty } )

</script>

<style scoped>
</style>