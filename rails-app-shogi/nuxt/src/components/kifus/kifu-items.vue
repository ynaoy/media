<template>
  <div>
    <div v-for="(kifu,key) in kifus" :key="key" >
      <kifuUrl :kifu="kifu"/>
    </div>
  </div>
</template>

<script setup>

  import kifuUrl from './kifu-url.vue'
  
  // 親コンポーネントから貰う奴ら。
  const user_id = inject('user_id')
  const { kifus } = defineProps(['kifus'])

   // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)

  defineExpose( { kifus } )

</script>

<style scoped>
</style>