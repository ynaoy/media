<template>
  <div>
    <h1>ログイン</h1>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <div class="invalid_form invalid_login"> {{ get_login_validation() }} </div>
        <form class="form_css" accept-charset="UTF-8">

          <label for="session_email">メールアドレス</label>
          <input class="form-control with-validation" type="email" name="session[email]" id="session_email"
            v-model="session_form.email">
          <div class="invalid_form"> {{ get_email_validation() }} </div>

          <label for="session_password">パスワード</label>
          <input class="form-control with-validation" type="password" name="session[password]" id="session_password"
            v-model="session_form.password">
          <PasswordReset>
            <p class="password_reset"> パスワードを忘れた？ </p>
          </PasswordReset>
          <div class="invalid_form"> {{ get_password_validation() }} </div>

          <input type="submit" name="commit" value="ログインする" class="btn btn-primary" data-disable-with="ログインする"
            @click.prevent="submit">
        </form>
      </div>
    </div>
    <button @click="login_check()">User 情報</button>
  </div>
</template>

<script setup>
  import { SessionHelper } from '../composables/SessionHelper'
  import PasswordReset from './PasswordReset.vue'

  //親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  const { login, login_check, reset_all_validation, check_validation, 
          get_email_validation, get_password_validation, get_login_validation, 
          set_email_validation,  set_password_validation, set_login_validation,
        } = SessionHelper()
  //このコンポーネントで使う変数群
  const session_form = { email: "", password:"" }

  const submit = async function(){
    //<<バグ inputに日本語と英字両方が混ざっていると>>
    //<<Error: Failed to execute 'setEnd' on 'Range': There is no child at offset 1.が出る>>
    if(check_validation(session_form)){
      login({ session: JSON.stringify(session_form)}, { "Authorization" : csrf_token })
    }
  }
  defineExpose( { set_email_validation, set_password_validation, set_login_validation, 
                  reset_all_validation, session_form, login, login_check, submit } );

</script>
<style lang="scss" scoped>
  .password_reset {
    float: right;
    color: 	#0D7EFD;
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
      color: 		#0A58CA;
    }
  }
  .invalid_login{
    display:flex;
    justify-content:center;
    font-size:105%;
  }
</style>