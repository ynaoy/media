<template>
  <SearchItems :users="users" :kifus="kifus" :query="search"  />
</template>

<script setup> 

  const route = useRoute()
  // 検索ワードを受け取るたびAPIから情報を受け取って更新する
  watch(route,async()=>{
    // クエリから検索ワードを受け取る
    search.value = route.query.search
    // APIから検索結果をもらう
    search_data = await search_user_and_kifu({ query: search.value }, {})
    users.value = JSON.parse(search_data["search_data"].users)
    kifus.value = JSON.parse(search_data["search_data"].kifus)
    nextTick()
  
  })

  // 使うメソッドをヘルパーからもらう
  const { search_user_and_kifu } = SearchHelper()

  // クエリから検索ワードを受け取る
  let search = ref(useRoute().query.search)
  // APIから検索結果をもらう
  let { search_data }  = await search_user_and_kifu({ query: search.value }, {})
  const users = ref(JSON.parse(search_data.users))
  const kifus = ref(JSON.parse(search_data.kifus))

</script>