<template>
  <div>
    <h1> {{ id }} </h1>
    <h1> {{ kifu_data.player2 }} </h1>
  </div>
</template>

<script setup>
  //このコンポーネントで使うヘルパー
  const { get_kifu } = KifuHelper()
  //親コンポーネントから貰う奴ら。
  const { id } = defineProps(["id"])
  console.log(id)
  const csrf_token = inject('csrf_token')
  const loginFlg = inject('loginFlg')
  const { kifu_data } = await get_kifu({ id:id }, { "Authorization" :csrf_token })
  console.log(kifu_data)
  //const { kifu_data } = await get_kifu({ id:id }, { "Authorization" :csrf_token })
  //console.log(kifu_data)
  defineExpose( { get_kifu, kifu_data } )
</script>

<style scoped>
</style>