<template>
  <Modal  v-bind = "modal_props" >
    <template v-slot:title>
      <h5 class="modal-title" id="sigupModalLabel"> ご入力されたメールアドレスに認証コードが送信されました。ご確認ください </h5>
    </template>

    <template v-slot:content>
      <form>
        <div class="mb-3">
          <label for="activation_token" class="col-form-label"> 認証コード: </label>
          <input type="text" maxlength="8" class="form-control" id="activation_token"
            ref ="focus_this"
            v-model="activation_token">
        </div>
      </form>
    </template>

    <template v-slot:footer>
      <button type="submit" class="btn btn-primary"
        @click.prevent="submit()">
        送信
      </button>
    </template>
        
  </Modal>
</template>

<script setup>
  import { UserHelper } from '../composables/UserHelper'  
  import Modal  from './Modal.vue'

  //親コンポーネントから貰う奴ら。
  const { is_test } = defineProps(['is_test'])
  const csrf_token = inject('csrf_token')
  const email = inject('email')
  const user_created_flg = inject('user_created_flg')

  const { post_account_activations } = UserHelper()

  //このコンポーネントで使う変数群
  const activation_token = ref("")
  const focus_this = ref(null)
  //このコンポーネントで使うメソッド群

  //描写されたと同時にinputにfocusする
  const focus_my_element = function(){
    focus_this.value.focus()
  }

  const submit = async function(){
    post_account_activations( { account_activation: JSON.stringify(
                                { email:email.value,
                                  activation_token: activation_token.value, 
                                }
                              )},
                              { "Authorization" : csrf_token }
                            )
  }

  // 子コンポーネントに送るやつら
  const modal_props = { centered: true,
                        hideHeaderClose: true,
                        noCloseOnBackdrop: true,
                        noCloseOnEsc: true,
                        id: "sigupModal",
                        ariaLabelledby: "sigupModalLabel" }

  provide('is_test',is_test)
  provide('reactive_model',user_created_flg)
  provide('shown_fnc',focus_my_element)

  defineExpose( { is_test, csrf_token, email, user_created_flg, activation_token, focus_this, modal_props,
                  post_account_activations, submit, focus_my_element,submit } );
</script>

<style scoped>
</style>