<template>
  <div>
    <NavBar/>
    <div class='app_wrapper'>

      <div class='side'>
        <SideNavigation/>
      </div>
      <div class='container'>
        <NuxtPage/>
      </div>

    </div>
  </div>
</template>

<script setup>

  const { login_check } = SessionHelper()

  //サーバー側にcookie付きのリクエスト送ってユーザーデータとログイン済みか貰う
  const {data, loginFlg} = await login_check()
  
  //子コーポネントに流すやつら
  provide('loginFlg',loginFlg)
  provide('user_id',data.user_id)
  provide('user_name',data.user_name)

</script>

<style scoped>
</style>
