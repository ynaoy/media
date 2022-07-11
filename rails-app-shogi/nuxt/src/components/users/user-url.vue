<template>
  <div class="user">
    <nuxt-link :to= "'/users/'+user.id">
      <span id = "user_name">
        {{ user.name }}
      </span>
    </nuxt-link>

    <nuxt-link v-if="loginFlg && admin" @click="console.log('delete')" id="deleteUrl">     
      <span id="delete"> delete </span>     
    </nuxt-link>
  </div>
</template>

<script setup>

  // 親コンポーネントから貰う奴ら。
  const loginFlg = inject('loginFlg')
  const admin = inject('admin')
  const csrf_token = inject('csrf_token')
  const { user } = defineProps(['user'])
  
  defineExpose( { user } )

</script>

<style scoped>
</style>