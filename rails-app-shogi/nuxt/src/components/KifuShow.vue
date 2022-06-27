<template>
  <div>
    <h1> {{ id }} </h1>
  </div>
</template>

<script setup>
  //このコンポーネントで使うヘルパー
  const { get_kifu } = KifuHelper()
  //親コンポーネントから貰う奴ら。
  const { id } = defineProps(["id"])
  const csrf_token = inject('csrf_token')
  const loginFlg = inject('loginFlg')
  //APIと通信して棋譜の情報をもらう
  const { kifu_data } = await get_kifu({ id:id }, { "Authorization" :csrf_token })
  defineExpose( { get_kifu, kifu_data } )
</script>

<style scoped>
</style>