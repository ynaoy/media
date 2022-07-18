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
  const csrf_token = inject('csrf_token')
  const { kifus } = defineProps(['kifus'])

   // 子コンポーネントに渡す奴ら。
  provide('user_id',user_id)
  provide('csrf_token',csrf_token)
  
  defineExpose( { kifus } )

</script>

<style scoped>
</style>