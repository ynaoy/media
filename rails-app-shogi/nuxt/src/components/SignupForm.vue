<template>
  <div>
    <h1>ユーザー登録</h1>
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-md-offset-3">
        <form class="form_css" accept-charset="UTF-8">
      
          <label for="user_name">ユーザー名</label>
          <input class="form-control" type="text" name="user[name]" id="user_name"
            @input="bindKeyword">

          <label for="user_email">メールアドレス</label>
          <input class="form-control" type="email" name="user[email]" id="user_email"
            v-model="signup_form.email">

          <label for="user_password">パスワード</label>
          <input class="form-control" type="password" name="user[password]" id="user_password"
            v-model="signup_form.password">

          <label for="user_password_confirmation">パスワードの確認</label>
          <input class="form-control" type="password" name="user[password_confirmation]" id="user_password_confirmation"
            v-model="signup_form.password_confirmation">

          <input type="submit" name="commit" value="作成" class="btn btn-primary" data-disable-with="作成"
            @click.prevent="submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  //親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  const { create_user } = UserHelper()

  const signup_form = { name:"",
                        email: "", 
                        password:"",
                        password_confirmation:"" }

  //日本語を扱う際に変換確定前の文字がformに反映されない問題を解決
  const  bindKeyword = function({ target }){
    signup_form.name =  target.value;
  }

  const submit = async function(){
    //<<Bug inputに日本語と英字両方が混ざっていると
    //Error: Failed to execute 'setEnd' on 'Range': There is no child at offset 1.が出る>>
    create_user({ user: JSON.stringify(signup_form)}, { "Authorization" :csrf_token })
  }
  defineExpose( { signup_form, submit } );
</script>

<style scoped>
</style>