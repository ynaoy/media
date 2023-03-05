<template>
  <div class = "user_show">
    <div class = "user_data">
      <h1 id = "user_name"> {{ user.name }} </h1>
      <nuxt-link v-if=" user_id == user.id" to="/profile" id="edit_url" > [編集] </nuxt-link>
      <div id="user_info"> {{ `${ kifus_size }件の棋譜` }} </div>
    </div>

  <KifusItems v-if="kifus.length != 0" :kifus = "kifus"/>
  <div v-else class="no_kifu"> このユーザーには棋譜がありません。 </div>
  </div>
</template>

<script lang="ts" setup>
  import KifusItems from './kifus/kifus-items.vue'

  // 親コンポーネントから貰う奴ら。
  const user_id :number = inject('user_id')
  const csrf_token :string= inject('csrf_token')
  const { user_data } = defineProps<{user_data: {[key:string]: any}}>()
  // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('csrf_token',csrf_token)

  const user = JSON.parse(user_data.user)
  const kifus = JSON.parse(user_data.kifus)
  
  // このコンポーネントで使うメソッド群
  // リスト形式の変数kifusのサイズを返す
  const kifus_size = computed(():number =>{
    if(kifus == undefined) return 0
    return kifus.length
  })
  defineExpose( { user_data } )

</script>

<style scoped>
</style>