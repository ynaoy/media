<template>

  <div id="tags">
    <div v-for="(tag,key) in tags" :key="key">
      <nuxt-link to="/" id="tag">{{ tag.name }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref } from 'vue'

  //親コンポーネントから貰う奴ら。
  const props = defineProps<{ tags: any[] }>()
  const tags  = toRef(props,"tags")
  
  defineExpose( { tags } )
</script>

<style lang="scss" scoped>
</style>