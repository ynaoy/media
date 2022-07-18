<template>
  <UserFavorite :favorite_kifus="favorite_kifus" />
</template>

<script setup>  
  // 親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  // 使うメソッドをヘルパーからもらう
  const { get_users_favorite } = UserHelper()

  const id = useRoute().params.id
  const { favorite_kifus } = await get_users_favorite({ id: id }, { "Authorization" :csrf_token })
</script>