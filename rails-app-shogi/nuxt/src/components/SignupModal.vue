<template>
  <div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#sigupModal"
            v-if="is_test">
        demo modal
    </button>
    <div class="modal fade" id="sigupModal" tabindex="-1" aria-labelledby="sigupModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="sigupModalLabel"> ご入力されたメールアドレスに認証コードが送信されました。ご確認ください </h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="activation_token" class="col-form-label"> 認証コード: </label>
                <input type="text" maxlength="8" class="form-control" id="activation_token"
                  v-model="activation_token">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" 
              @click.prevent="submit">
              送信
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { UserHelper } from '../composables/UserHelper'  

  //親コンポーネントから貰う奴ら。
  const { is_test } = defineProps(['is_test'])
  const csrf_token = inject('csrf_token')
  const email = inject('email')

  const { post_account_activations } = UserHelper()

  //このコンポーネントで使う変数群
  const activation_token = ref("")

  //このコンポーネントで使うメソッド群

  const submit = async function(){
    post_account_activations( { account_activation: JSON.stringify(
                                { email:email.value,
                                  activation_token: activation_token.value, 
                                }
                              )},
                              { "Authorization" : csrf_token }
                            )
  }

  defineExpose( { is_test, csrf_token, email, activation_token, 
                  post_account_activations, submit } );
</script>

<style scoped>
</style>