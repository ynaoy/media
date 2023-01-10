<template>
  <div>
    <span @click= "set_status('check_email')" class="password_reset_slot">
      <slot></slot>
    </span>
    <CheckEmailModal></CheckEmailModal>
  </div>
</template>

<script setup>
  import { provide} from 'vue'
  import { PasswordResetHelper } from '../composables/PasswordResetHelper'
  import CheckEmailModal from './password_resets/CheckEmailModal.vue'

  //親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  //リアクティブな変数群とメソッド群
  const { reset_status, check_email_to_post, create_password_reset, update_password_reset }
      = PasswordResetHelper()

  //全modal共通のstatusを更新して最初のmodalを起動する
  const set_status =(status)=>{
    reset_status.value=status
    console.log(reset_status.value)
  }
  //子コンポーネントに渡す変数群
  provide('csrf_token', csrf_token)
  provide('reset_status', reset_status)
  provide('check_email_to_post', check_email_to_post)
  provide('create_password_reset', create_password_reset)
  provide('update_password_reset',  update_password_reset)

  defineExpose({ csrf_token, reset_status, set_status, check_email_to_post, create_password_reset, update_password_reset })
</script>
