<template>
  <SearchItems :search_data="search_data" :query="search" />
</template>

<script setup>  

  // 使うメソッドをヘルパーからもらう
  const { search_user_and_kifu } = SearchHelper()

  const search = useRoute().query.search
  const { search_data } = await search_user_and_kifu({ query: search }, {})
</script>