<template>
  <Modal  v-bind = "modal_props" >
    <template v-slot:title>
      <h5 class="modal-title" id="ChekEmailModalLabel"> アカウントを探す </h5>
    </template>

    <template v-slot:content>
      <form>
        <div class="mb-3">
          <label for="ChekEmail" class="col-form-label"> メールアドレス: </label>
          <input type="text" class="form-control" id="ChekEmail"
            ref ="focus_this"
            v-model="email">
          <div class="invalid_form"> {{ get_validation() }} </div>
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
  const get_validation = inject('get_validation')
  const check_email_to_post = inject('check_email_to_post')
  const set_reset_status = inject('set_reset_status')
  const reset_validation = inject('reset_validation')
  const email = inject('email')

  //このコンポーネントで使う変数群
  const check_email_flg = ref(false)
  const focus_this = ref(null)

  //--このコンポーネントで使うメソッド群--

  //描写されたと同時にinputにfocusする
  const focus_my_element = function(){
    focus_this.value.focus()
  }

  //子コンポーネントでModalが非表示になった際にreset_statusの値を戻す
  const hidden_modal = function(){
    //非表示になった時に次のステータスだったら戻さない
    if(reset_status.value != "create_password_reset") set_reset_status("ready")
    reset_validation()
  }

  const submit = async function(){
    check_email_to_post( { password_reset: JSON.stringify(
                            { email:email.value,}
                          )},
                          { "Authorization" : csrf_token }
                        )
  }

  //--子コンポーネントに送るやつら--
  const modal_props = { centered: true,
                        noCloseOnBackdrop: true,
                        noCloseOnEsc: true,
                        id: "CheckEmailModal",
                        ariaLabelledby: "CheckEmailModalLabel" }

  provide('reactive_model', check_email_flg)
  provide('shown_fnc', focus_my_element)
  provide('hidden_fnc', hidden_modal)
  provide('is_test', false)

  //reset_status.valueの値が今のステータスだったらモダルを表示する
  watch(reset_status,()=>{ 
    if(reset_status.value == "check_email"){ 
      check_email_flg.value = true 
    }
    else{
      check_email_flg.value = false
    }
  })

  defineExpose({  csrf_token, reset_status, get_validation, check_email_to_post,
                  set_reset_status, reset_validation, hidden_modal })
</script>