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
  const check_email_to_post = inject('check_email_to_post')
  const create_password_reset = inject('create_password_reset')
  const update_password_reset = inject('update_password_reset')

  //このコンポーネントで使う変数群
  const check_email_flg = ref(false)
  const email = ref("")
  const focus_this = ref(null)
  //このコンポーネントで使うメソッド群

  //描写されたと同時にinputにfocusする
  const focus_my_element = function(){
    focus_this.value.focus()
  }

  const submit = async function(){
    check_email_to_post( { password_reset: JSON.stringify(
                            { email:email.value,}
                          )},
                          { "Authorization" : csrf_token }
                        )
  }

  // 子コンポーネントに送るやつら
  const modal_props = { centered: true,
                        noCloseOnBackdrop: true,
                        noCloseOnEsc: true,
                        id: "CheckEmailModal",
                        ariaLabelledby: "CheckEmailModalLabel" }

  //子コンポーネントに渡す変数群
  provide('reactive_model', check_email_flg)
  provide('shown_fnc', focus_my_element)
  provide('is_test', false)
  
  provide('csrf_token', csrf_token)
  provide('reset_status', reset_status)
  provide('create_password_reset', create_password_reset)
  provide('update_password_reset',  update_password_reset)

  //reset_status.valueの値が"check_email"だったらモダルを表示する
  watch(reset_status,()=>{ 
    console.log(reset_status.value)
    if(reset_status.value == "check_email"){ 
      check_email_flg.value = true 
    }
    else{
      check_email_flg.value = false
    }
  })

  defineExpose({ csrf_token, reset_status, create_password_reset, update_password_reset })
</script>