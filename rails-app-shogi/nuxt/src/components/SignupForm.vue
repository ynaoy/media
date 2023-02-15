<template>
  <div>
    <h1>ユーザー登録</h1>
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-md-offset-3">
        <form class="form_css" accept-charset="UTF-8">

          <label for="user_name">ユーザー名</label>
          <input class="form-control with-validation" type="text" name="user[name]" id="user_name"
              @input="bindKeyword">
          <div class="invalid_form"> {{ get_user_name_validation() }} </div>

          <label for="user_email">メールアドレス</label>
          <input class="form-control with-validation" type="email" name="user[email]" id="user_email"
            v-model="signup_form.email">
          <div class="invalid_form"> {{ get_email_validation() }} </div>

          <label for="user_password">パスワード</label>
          <input class="form-control with-validation" type="password" name="user[password]" id="user_password"
            v-model="signup_form.password">
          <div class="invalid_form"> {{ get_password_validation() }} </div>

          <label for="user_password_confirmation">パスワードの確認</label>
          <input class="form-control" type="password" name="user[password_confirmation]" id="user_password_confirmation"
            v-model="signup_form.password_confirmation">

          <input type="submit" name="commit" value="作成" class="btn btn-primary" data-disable-with="作成"
            @click.prevent="submit()">
        </form>
      </div>
    </div>
    <SignupModal></SignupModal>
  </div>
</template>

<script setup>
  import { UserHelper } from '../composables/UserHelper'  
  import SignupModal from './SignupModal.vue'

  //このコンポーネントで使う変数群
  const signup_form = reactive({
                        name:"",
                        email: "", 
                        password:"",
                        password_confirmation:"" })

  //親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  // このコンポーネントで使う変数群
  const user_created_flg = ref(false)

  //子コンポーネントに渡す奴ら
  provide('csrf_token', csrf_token)
  provide('email', toRef(signup_form,'email') )
  provide('user_created_flg',  user_created_flg )
  
  // ヘルパーから使うメソッドをもらう。create_userはapiと通信するメソッド
  const { create_user, reset_all_validation, check_validation, 
          get_email_validation, get_user_name_validation, get_password_validation,
          set_email_validation, set_user_name_validation, set_password_validation
        } = UserHelper()

  // このコンポーネントで使うメソッド群
  //日本語を扱う際に変換確定前の文字がformに反映されない問題を解決
  const  bindKeyword = function({ target }){
    signup_form.name =  target.value;
  }

  const submit = async function(){
    //<<Bug inputに日本語と英字両方が混ざっていると
    //Error: Failed to execute 'setEnd' on 'Range': There is no child at offset 1.が出る>>
    if(check_validation(signup_form)){
      create_user(  { user: JSON.stringify(signup_form)},
                    { "Authorization" : csrf_token },
                    user_created_flg
                  )
      console.log(user_created_flg.value)
    }
  }
  defineExpose({  set_email_validation, set_user_name_validation, set_password_validation,
                  reset_all_validation, signup_form, submit } );
</script>

<style scoped>
</style>