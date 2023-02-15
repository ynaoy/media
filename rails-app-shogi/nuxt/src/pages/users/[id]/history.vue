<template>
  <UserHistory :hist_data="hist_data" />
</template>

<script setup>  
  // 親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  // 使うメソッドをヘルパーからもらう
  const { get_users_history } = UserHelper()

  const id = useRoute().params.id
  const { hist_data } = await get_users_history({ id: id }, { "Authorization" :csrf_token })
</script>