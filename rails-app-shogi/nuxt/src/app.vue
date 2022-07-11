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
  const {data, loginFlg, csrf_token} = await login_check()
  console.log(`user_id: ${data.user_id}`)
  console.log(`admin: ${data.admin}`)
  console.log(`loginFlg: ${loginFlg}`)
  console.log(`csrf_token: ${csrf_token}`)
  //子コーポネントに流すやつら
  provide('csrf_token',csrf_token)
  provide('loginFlg',loginFlg)
  provide('user_id',data.user_id)
  provide('user_name',data.user_name)
  provide('admin',data.admin)

</script>

<style scoped>
</style>
