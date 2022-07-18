<template>
  <UserIndex :users = "users"/>
</template>
<script setup>
  // 使うメソッドをヘルパーからもらう
  const { get_all_user } = UserHelper()
  //すべてのタグを呼び出す
  const { users } = await get_all_user()
</script>