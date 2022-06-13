<template>
  <div>
    <h1>ログイン</h1>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <form class="form_css" accept-charset="UTF-8">

          <label for="session_email">メールアドレス</label>
          <input class="form-control" type="email" name="session[email]" id="session_email"
            v-model="session_form.email">

          <label for="session_password">パスワード</label>
          <input class="form-control" type="password" name="session[password]" id="session_password"
            v-model="session_form.password">

          <input type="submit" name="commit" value="ログインする" class="btn btn-primary" data-disable-with="ログインする"
            @click.prevent="submit">
        </form>
      </div>
    </div>
    <button @click="login_check()">User 情報</button>
  </div>
</template>

<script setup>
  const { login, login_check} = SessionHelper()
  const session_form = { email: "", password:"" }

  const submit = async function(){
    //<<バグ inputに日本語と英字両方が混ざっていると
    //Error: Failed to execute 'setEnd' on 'Range': There is no child at offset 1.が出る>>
    login({ session: JSON.stringify(session_form)} )
  }

</script>

<style scoped>
</style>