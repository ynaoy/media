<template>
  <div>
    <div class="control_data">
      <DropDown
        :text = "tag"
        :items = "tags"
        :click_callback = "(value)=>{ return emit('update_tag',value) }"
      />
      <button class="reload_button" 
        @click.prevent="emit_and_processing('update_kifu')" v-bind:disabled= processing>
        <img src="/更新ボタン.png" alt="更新">
      </button>
    </div>

    <div v-if="check_is_empty(kifu_data)">
      <Kifu :kifu_data="kifu_data" />
      <kifuTag :tags="JSON.parse(kifu_data.tags)"/>
    </div>
    <KifusItems v-if="check_is_empty(kifus)" :kifus="kifus"/>
  </div>
</template>

<script lang ="ts" setup>
  import KifusItems from './kifus/kifus-items.vue'
  import Kifu from './kifus/kifu.vue'
  import KifuTag from './kifus/kifu-tag.vue'
  import DropDown from './DropDown.vue'
  import { AppHelper } from '../composables/AppHelper'
  import { Ref } from '@vue/reactivity'

  // このコンポーネントで使うヘルパー
  const { check_is_empty } = AppHelper()

  const emit = defineEmits(['update_tag','update_kifu'])

  //親コンポーネントから貰う奴ら。
  const props = defineProps<{
    kifu_data: { [key:string]: any}, 
    kifus: { [key:string]: any},
    tags: Array<string>
  }>()
  const { kifu_data, kifus, tags } = toRefs(props)
  const csrf_token :string = inject('csrf_token')
  const loginFlg :boolean = inject('loginFlg')
  const user_id :number = inject('user_id')
  const tag : Ref<string> = inject('tag')

  //子コーポネントに流すやつら
  provide('csrf_token',csrf_token)
  provide('loginFlg',loginFlg)
  provide('user_id',user_id)

  // --このコンポーネントで使う変数群--
  const processing: Ref<boolean> = ref(false) //apiと通信中かどうかを管理する変数

  // --このコンポーネントで使うメソッド群--
  const emit_and_processing =(emit_name: Parameters<typeof emit>[0], value="")=>{
    processing.value = true
    emit(emit_name, value)
  }

  watch(kifu_data,async()=>{
    processing.value = false
  })

  defineExpose( { kifus, kifu_data, tags, tag, processing, emit_and_processing } )
</script>

<style lang="scss" scoped>
  .control_data{
    display: flex;
    width: 49.032vw;
    margin-bottom: 1vh;
  }
  button{ 
    //button属性のcssをリセットする
    width: auto;
    padding:0;
    margin:0;
    background:none;
    border:0;
    font-size:0;
    line-height:0;
    overflow:visible;
    cursor:pointer;
  }
  .reload_button{
    margin-left: auto;
    margin-right: 0;
  }
</style>