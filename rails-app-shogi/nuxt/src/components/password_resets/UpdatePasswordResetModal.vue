<template>
  <Modal  v-bind = "modal_props" >
    <template v-slot:title>
      <h5 class="modal-title" id="UpdatePasswordResetModalLabel"> 新しいパスワードを入力 </h5>
    </template>

    <template v-slot:content>
      <form>
        <div class="mb-3">
          <label for="user_password">パスワード</label>
          <input class="form-control" type="password" id="update_password"
            ref ="focus_this"
            v-model="update_form.password">

          <label for="user_password_confirmation">パスワードの確認</label>
          <input class="form-control" type="password" id="update_password_confirmation"
            v-model="update_form.password_confirmation">
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
  const update_password_reset = inject('update_password_reset')
  const set_reset_status = inject('set_reset_status')
  const email = inject('email')
  const reset_token = inject('reset_token')

  //このコンポーネントで使う変数群
  const update_password_reset_flg = ref(false)
  const update_form = reactive({ password:"",  password_confirmation:"" })
  const focus_this = ref(null)
  
  //--このコンポーネントで使うメソッド群--

  //描写されたと同時にinputにfocusする
  const focus_my_element = function(){
    focus_this.value.focus()
  }
  
  //子コンポーネントでModalが非表示になった際にreset_statusの値を戻す
  const hidden_modal = function(){
    //非表示になった時に次のステータスだったら戻さない
    if(reset_status.value != "ready") set_reset_status("ready")
  }

  const submit = async function(){
    update_password_reset(  { password_reset: JSON.stringify( { email:email.value,} ),
                              user: JSON.stringify( update_form ),
                              reset_token: reset_token.value,
                            },
                            { "Authorization" : csrf_token }
                          )
  }

  //--子コンポーネントに送るやつら--
  const modal_props = { centered: true,
                        noCloseOnBackdrop: true,
                        noCloseOnEsc: true,
                        id: "UpdatePasswordResetModal",
                        ariaLabelledby: "UpdatePasswordResetModal" }

  provide('reactive_model', update_password_reset_flg)
  provide('shown_fnc', focus_my_element)
  provide('hidden_fnc', hidden_modal)
  provide('is_test', false)

  //reset_status.valueの値が今のステータスだったらモダルを表示する
  watch(reset_status,()=>{ 
    if(reset_status.value == "update_password_reset"){ 
      update_password_reset_flg.value = true 
    }
    else{
      update_password_reset_flg.value = false
    }
  })

  defineExpose({  csrf_token, update_form, reset_status, update_password_reset,
                  set_reset_status, hidden_modal, reset_token })
</script>