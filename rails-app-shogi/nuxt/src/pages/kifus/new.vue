<template>
  <KifuForm :tags = "tags"/>
</template>
<script setup>
  // 使うメソッドをヘルパーからもらう
  const { get_all_tag } = TagHelper()
  //すべてのタグを呼び出す
  const tags = await get_all_tag()
</script>
