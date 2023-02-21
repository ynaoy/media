<template>
  <div>
    <div v-for="(user,key) in users" :key="key" >
      <userUrl :user="user"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

  import userUrl from './user-url.vue'
  
  // 親コンポーネントから貰う奴ら。
  const loginFlg:boolean  = inject('loginFlg')
  const admin:boolean     = inject('admin')
  const csrf_token:string = inject('csrf_token')
  const { users } = defineProps<{ users: [{[key:string]: any}] }>()

  // 子コンポーネントに渡す奴ら。
  provide('loginFlg',loginFlg)
  provide('admin',admin)
  provide('csrf_token',csrf_token)
  
  defineExpose( { users } )

</script>

<style scoped>
</style>