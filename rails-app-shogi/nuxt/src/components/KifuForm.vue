<template>
  <div>
    <h1>棋譜を追加</h1>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <form class="form_css" accept-charset="UTF-8">

          <label for="kifu_title">タイトル</label>
          <input class="form-control" type="text" name="kifu[title]" id="kifu_title"
            v-model="kifu_form.title">

          <label for="kifu_player1">先手</label>
          <input class="form-control with-validation" maxlength="10" size="10" type="text" name="kifu[player1]" id="kifu_player1"
            v-model="kifu_form.player1">
          <div class="invalid_form"> {{ get_kifu_player1_validation() }} </div>

          <label for="kifu_player2">後手</label>
          <input class="form-control with-validation" maxlength="10" size="10" type="text" name="kifu[player2]" id="kifu_player2"
            v-model="kifu_form.player2"/>
          <div class="invalid_form"> {{ get_kifu_player2_validation() }} </div>

          <div class="form_kifu">
            <label for="kifu_content">棋譜</label>
            <p>※必須</p>
          </div>
          <textarea class="form-control with-validation" required="true" name="kifu[content]" id="kifu_content" cols="0" rows="8"
            v-model="kifu_form.content"></textarea>
          <div class="invalid_form"> {{ get_kifu_content_validation() }} </div>

          <label for="kifu_tag">タグ</label>
          <div class="tag_form">
            <div v-for="(value,key) in tags" :key="key" class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" :value="key+1" name="kifu[tag][tag_ids][]" :id="'kifu_tag_ids_'+(key+1)"
                v-model="kifu_form.tag.tag_ids">
              <label class="form-check-label" :for="'kifu_tag_ids_'+(key+1)">
                {{ value }}
              </label>
            </div>
          </div>

          <div class="kento_form form-check">
            <input class="form-check-input" type="checkbox" id="kento_checkbox"
              v-model="kifu_form.kento">
            <label class="form-check-label" for="kento_checkbox">
              この棋譜を自動検討する（数分から数時間かかることがあります）
            </label>
          </div>

          <input type="submit" name="commit" value="作成" class="btn btn-primary" data-disable-with="作成"
            @click.prevent="submit">

        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SessionHelper } from '../composables/SessionHelper'
  import { KifuHelper } from '../composables/KifuHelper'
  
  // 親コンポーネントから貰う奴ら。
  const csrf_token :string = inject('csrf_token')
  const loginFlg :boolean = inject('loginFlg')
  const { tags } = defineProps<{ tags: any[] }>()

  // 使うメソッドをヘルパーからもらう
  const { create_kifu, get_kifu_player1_validation, get_kifu_player2_validation,
          get_kifu_content_validation, set_kifu_player1_validation, set_kifu_player2_validation,
          set_kifu_content_validation, reset_all_validation, check_validation
        } = KifuHelper()
  const { force_login } = SessionHelper()

  // ログインしていなかったらログインページに飛ばす
  force_login(loginFlg)
  
  // フォームをバインドする奴ら
  const kifu_form = { title: "", player1:"", player2:"", kento: false, content:"",
                      tag: reactive({ tag_ids:[] })} //tagはリアクティブじゃないと動作しなかった 

  const submit = async function(){
    //<<バグ inputに日本語と英字両方が混ざっていると>>
    //<<Error: Failed to execute 'setEnd' on 'Range': There is no child at offset 1.が出る>>
    if(check_validation({ player1: kifu_form.player1, 
                          player2: kifu_form.player2, 
                          content: kifu_form.content,})){
      create_kifu({ kifu:  JSON.stringify(kifu_form)}, { "Authorization" : csrf_token })
    }
  }

  defineExpose( { set_kifu_player1_validation, set_kifu_player2_validation, set_kifu_content_validation,
                  reset_all_validation, kifu_form, tags, create_kifu, submit } );

</script>

<style scoped>
</style>