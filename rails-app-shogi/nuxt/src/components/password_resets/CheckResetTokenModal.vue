<template>
  <Modal  v-bind = "modal_props" >
    <template v-slot:title>
      <h5 class="modal-title" id="sigupModalLabel"> ご入力されたメールアドレスに認証コードが送信されました。ご確認ください </h5>
    </template>

    <template v-slot:content>
      <form>
        <div class="mb-3">
          <label for="reset_token" class="col-form-label"> 認証コード: </label>
          <input type="text" maxlength="8" class="form-control" id="reset_token"
            ref ="focus_this"
            v-model="reset_token">
          <div class="invalid_form"> {{ validation }} </div>
        </div>
      </form>
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
  const validation = inject('validation')
  const check_token = inject('check_token')
  const set_reset_status = inject('set_reset_status')
  const reset_validation = inject('reset_validation')
  const email = inject('email')
  const reset_token = inject('reset_token')

  //このコンポーネントで使う変数群
  const check_reset_token_flg = ref(false)
  const focus_this = ref(null)
  
  //--このコンポーネントで使うメソッド群--

  //描写されたと同時にinputにfocusする
  const focus_my_element = function(){
    focus_this.value.focus()
  }
  
  //子コンポーネントでModalが非表示になった際にreset_statusの値を戻す
  const hidden_modal = function(){
    //非表示になった時に次のステータスだったら戻さない
    if(reset_status.value != "update_password_reset") set_reset_status("ready")
    reset_validation()
  }

  const submit = async function(){
    check_token(  { password_reset: JSON.stringify( { email:email.value,} ),
                    reset_token: reset_token.value,
                  },
                  { "Authorization" : csrf_token }
                )
  }

  //--子コンポーネントに送るやつら--
  const modal_props = { centered: true,
                        noCloseOnBackdrop: true,
                        noCloseOnEsc: true,
                        id: "CheckResetTokenModal",
                        ariaLabelledby: "CheckResetTokenModal" }

  provide('reactive_model', check_reset_token_flg)
  provide('shown_fnc', focus_my_element)
  provide('hidden_fnc', hidden_modal)
  provide('is_test', false)

  //reset_status.valueの値が今のステータスだったらモダルを表示する
  watch(reset_status,()=>{ 
    if(reset_status.value == "check_token"){ 
      check_reset_token_flg.value = true 
    }
    else{
      check_reset_token_flg.value = false
    }
  })

  defineExpose({  csrf_token, reset_status, validation, check_token, 
                  set_reset_status, reset_validation, hidden_modal, reset_token })
</script>