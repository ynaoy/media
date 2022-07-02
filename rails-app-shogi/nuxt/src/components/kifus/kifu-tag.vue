<template>

  <div id="tags">
    <div v-for="(tag,key) in tags" :key="key">
      <nuxt-link to="/" id="tag">{{ tag.name }}</nuxt-link>
    </div>
  </div>
</template>

<script setup>
  //親コンポーネントから貰う奴ら。
  const { tags } = defineProps(["tags"])
  
  defineExpose( { tags } )
</script>

<style lang="scss" scoped>
</style>