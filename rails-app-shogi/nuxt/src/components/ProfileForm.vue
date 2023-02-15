<template>
  <div>
    <h1>ユーザー編集</h1>
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-md-offset-3">
        <form class="form_css" accept-charset="UTF-8">
      
          <label for="user_name">ユーザー名</label>
          <input :value="user_name" class="form-control" type="text" name="user[name]" id="user_name"
            @input="bindKeyword">

          <input type="submit" name="commit" value="編集" class="btn btn-primary" data-disable-with="編集"
            @click.prevent="submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { UserHelper } from '../composables/UserHelper'

 //親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')
  const user_id = inject('user_id')
  const user_name = inject('user_name')
  const { update_user } = UserHelper()

  const update_form = { name:"" }

  //日本語を扱う際に変換確定前の文字がformに反映されない問題を解決
  const  bindKeyword = function({ target }){
    update_form.name =  target.value;
  }

  const submit = async function(){
    //<<Bug inputに日本語と英字両方が混ざっていると
    //Error: Failed to execute 'setEnd' on 'Range': There is no child at offset 1.が出る>>
    console.log(update_form.name)
    update_user({ id:user_id, user: JSON.stringify(update_form)}, { "Authorization" : csrf_token })
  }
  defineExpose( { update_form, submit } );
</script>

<style scoped>
</style>