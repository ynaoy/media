<template>
  <Modal  v-bind = "modal_props" >
    <template v-slot:title>
      <h5 class="modal-title" id="CreatePasswordResetModalLabel"> 認証コードの送信先を確認してください </h5>
    </template>

    <template v-slot:content>
      <div class="mb-3">
        <p> パスワードを変更する前にご本人確認が必要です。以下のメールアドレスに本人確認の認証コードを送信します </p>
        <h5> {{ email }} </h5>
      </div>
    </template>

    <template v-slot:footer>
      <button type="submit" class="btn btn-primary"
        @click.prevent="submit()">
        次へ
      </button>
    </template>
        
  </Modal>
</template>

<script setup>
  import { provide} from 'vue'
  import Modal  from '../Modal.vue'

  //親コンポーネントから貰う奴ら。
  const csrf_token = inject('csrf_token')
  const reset_status = inject('reset_status')
  const create_password_reset = inject('create_password_reset')
  const set_reset_status = inject('set_reset_status')
  const email = inject('email')

  //このコンポーネントで使う変数群
  const password_reset_flg = ref(false)

  //--このコンポーネントで使うメソッド群--

  //子コンポーネントでModalが非表示になった際にreset_statusの値を戻す
  const hidden_modal = function(){
    //非表示になった時に次のステータスだったら戻さない
    if(reset_status.value != "create_password_reset") set_reset_status("ready")
  }

  const submit = async function(){
    create_password_reset({ password_reset: JSON.stringify(
                            { email:email.value,}
                          )},
                          { "Authorization" : csrf_token }
                        )
  }

  // 子コンポーネントに送るやつら
  const modal_props = { centered: true,
                        noCloseOnBackdrop: true,
                        noCloseOnEsc: true,
                        id: "CreatePasswordResetModal",
                        ariaLabelledby: "CreatePasswordResetModal" }

  provide('reactive_model', password_reset_flg)
  provide('hidden_fnc', hidden_modal)
  provide('is_test', false)

  //reset_status.valueの値が"check_email"だったらモダルを表示する
  watch(reset_status,()=>{ 
    if(reset_status.value == "create_password_reset"){ 
      password_reset_flg.value = true 
    }
    else{
      password_reset_flg.value = false
    }
  })

  defineExpose({  csrf_token, reset_status, create_password_reset, set_reset_status, hidden_modal })
</script>