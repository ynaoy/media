<template>
  <KifuShow :kifu_data="kifu_data"/>
</template>

<script setup>  
  // 親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  // 使うメソッドをヘルパーからもらう
  const { get_kifu } = KifuHelper()

  const id = useRoute().params.id
  const { kifu_data } = await get_kifu({ id: id }, { "Authorization" :csrf_token })
</script>