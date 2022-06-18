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
            <b-dropdown-item href="/profile" varient="dark">Setting</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="/" varient="dark" @click="logout">Log out</b-dropdown-item>
          </b-dropdown>

          <li v-if="!loginFlg"><nuxt-link to="/login" class="nav-link dropdown-item">ログイン</nuxt-link></li>
          <li v-if="!loginFlg"><nuxt-link to="/signup" class="nav-link dropdown-item">新規登録</nuxt-link></li>
        </ul>
      </nav>

    </div>
  </header>
</template>

<script setup>
  const { logout } = SessionHelper()
  //親コンポーネントから貰う奴ら。未ログイン時にはuser_nameにはnullが入ってるので注意
  const user_name = ref(inject('user_name'))
  const loginFlg = ref(inject('loginFlg'))

  //フォームで使うやつら
  const search_form = { text: ""}

  //日本語の変換確定してないときに正しく入力されない問題をクリアする
  const  bindKeyword = function({ target }){
    search_form.text =  target.value;
  }
  const hello = computed(()=>{return "hello"})
  const submit = async function(){
    //<<Bug inputに日本語と英字両方が混ざっていると
    //Error: Failed to execute 'setEnd' on 'Range': There is no child at offset 1.が出る>>
    console.log(search_form.text)
  }
  defineExpose( user_name,loginFlg,search_form,bindKeyword,submit );
</script>

<style scoped>
</style>
