<template>
  <div>
    <span @click= "set_reset_status('check_email')" class="password_reset_slot">
      <slot></slot>
    </span>
    <CheckEmailModal></CheckEmailModal>
    <CreatePasswordResetModal></CreatePasswordResetModal>
    <CheckResetTokenModal></CheckResetTokenModal>
    <UpdatePasswordResetModal></UpdatePasswordResetModal>
  </div>
</template>

<script setup>
  import { provide} from 'vue'
  import { PasswordResetHelper } from '../composables/PasswordResetHelper'
  import CheckEmailModal from './password_resets/CheckEmailModal.vue'
  import CreatePasswordResetModal from './password_resets/CreatePasswordResetModal.vue'
  import CheckResetTokenModal from './password_resets/CheckResetTokenModal.vue'
  import UpdatePasswordResetModal from './password_resets/UpdatePasswordResetModal.vue'

  //親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')

  //リアクティブな変数群とメソッド群
  const email = ref('')
  const reset_token = ref('')
  const { reset_status, check_email_to_post, create_password_reset,
          check_token, update_password_reset, set_reset_status }
      = PasswordResetHelper()

  //子コンポーネントに渡す変数群
  provide('csrf_token', csrf_token)
  provide('email', email)
  provide('reset_token', reset_token)
  provide('reset_status', reset_status)
  provide('check_email_to_post', check_email_to_post)
  provide('create_password_reset', create_password_reset)
  provide('check_token',check_token)
  provide('update_password_reset',  update_password_reset)
  provide('set_reset_status',  set_reset_status)

  defineExpose({  csrf_token, email, reset_token, reset_status, set_reset_status,
                  check_email_to_post, create_password_reset, check_token, update_password_reset })
</script>
