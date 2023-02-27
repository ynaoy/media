<template>
  <header class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container">
      <nuxt-link to="/" class="logo">将棋のお時間</nuxt-link>
      <nav>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <form class="d-flex search_form" accept-charset="UTF-8">
              <input required=true class="form-control" type="text" name="query" id="query" 
                @input="bindKeyword">
              <input type="submit" name="commit" value="検索" class="btn btn-primary" data-disable-with="検索"
                @click.prevent="submit">
            </form>
          </li>
          
          <b-dropdown v-if="loginFlg" split split-href="/" :text="user_name"
            variant="dark" split-variant="dark"
            class="dropdown collapse navbar-collapse" menu-class="dropdown-menu-dark">
            <b-dropdown-item href="/profile" >Setting</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click.prevent="session_logout">Log out</b-dropdown-item>
          </b-dropdown>

          <li v-if="!loginFlg"><nuxt-link to="/login" class="nav-link dropdown-item">ログイン</nuxt-link></li>
          <li v-if="!loginFlg"><nuxt-link to="/signup" class="nav-link dropdown-item">新規登録</nuxt-link></li>
        </ul>
      </nav>

    </div>
  </header>
</template>

<script lang="ts" setup>
  import { SessionHelper } from '../composables/SessionHelper'
  import { SearchHelper } from '../composables/SearchHelper'
  import { Ref } from 'vue'

  // このコンポーネントで使うメソッドをヘルパーからもらう
  const { logout } = SessionHelper()
  const { move_search } = SearchHelper()

  //親コンポーネントから貰う奴ら。未ログイン時にはuser_nameにはnullが入ってるので注意
  const csrf_token :string      = inject('csrf_token')
  const user_name :Ref<string>  = ref(inject('user_name'))
  const loginFlg :Ref<boolean>  = ref(inject('loginFlg'))

  //フォームで使うやつら
  const search_form = { text: ""}

  // フォームで日本語の変換確定してないときに正しく入力されない問題をクリアする
  const  bindKeyword = function({ target }){
    search_form.text =  target.value;
  }

  const session_logout = async function(){
    logout({ "Authorization" :csrf_token })
  }

  const submit = async function(){
    // <<Bug inputに日本語と英字両方が混ざっていると
    // Error: Failed to execute 'setEnd' on 'Range': There is no child at offset 1.が出る>>
    console.log(search_form.text)
    // searchページに飛ばす
    move_search(search_form.text)
  }

  defineExpose( { user_name,
                  loginFlg,
                  search_form,
                  bindKeyword,
                  session_logout,
                  move_search,
                  submit  } );
</script>

<style scoped>
</style>
