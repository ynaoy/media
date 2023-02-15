<template>
  <UserShow :user_data="user_data"/>
</template>

<script setup>  
  // 親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  // 使うメソッドをヘルパーからもらう
  const { get_user } = UserHelper()

  const id = useRoute().params.id
  const { user_data } = await get_user({ id: id }, { "Authorization" :csrf_token })
</script>