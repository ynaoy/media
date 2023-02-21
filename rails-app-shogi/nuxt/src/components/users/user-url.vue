<template>
  <div class="user">
    <nuxt-link :to= "'/users/'+user.id">
      <span id = "user_name">
        {{ user.name }}
      </span>
    </nuxt-link>

    <nuxt-link v-if="loginFlg && admin" @click = "submit_delete()" id="deleteUrl">     
      <span id="delete"> delete </span>     
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
  import { UserHelper } from '../../composables/UserHelper'

  //このコンポーネントで使うヘルパー
  const { delete_user } = UserHelper()

  // 親コンポーネントから貰う奴ら。
  const loginFlg:boolean  = inject('loginFlg')
  const admin:boolean     = inject('admin')
  const csrf_token:string = inject('csrf_token')
  const { user } = defineProps<{ user:{[key:string]: any} }>()
  
  // 棋譜の削除を実行するメソッド
  const submit_delete = ()=>{
    delete_user({ id: user.id }, { "Authorization" :csrf_token })
  }

  defineExpose( { user, submit_delete } )

</script>

<style scoped>
</style>