<template>
  <KifuIndex :kifus = "kifus"/>
</template>
<script setup>
  // 使うメソッドをヘルパーからもらう
  const { get_users_kifu } = KifuHelper()
  //すべてのタグを呼び出す
  const { kifus } = await get_users_kifu()
</script>