<template>
  <div>
    <div class="control_data">
      <b-dropdown :text="tag" variant="light" menu-class="dropdown-menu-light">
        <b-dropdown-item-button  v-for="(value,key) in tags" :key="key" 
          @click.prevent="emit('update_tag', value)">
          {{ value }}
        </b-dropdown-item-button>
      </b-dropdown>
    </div>
    <div>
      <Kifu :kifu_data="kifu_data" />
      <kifuTag :tags="JSON.parse(kifu_data.tags)"/>
    </div>
    <KifusItems v-if="check_is_empty(kifus)" :kifus="kifus"/>
  </div>
</template>

<script setup>
  import KifusItems from './kifus/kifus-items.vue'
  import Kifu from './kifus/kifu.vue'
  import KifuTag from './kifus/kifu-tag.vue'
  import { AppHelper } from '../composables/AppHelper'

  // このコンポーネントで使うヘルパー
  const { check_is_empty } = AppHelper()

  const emit = defineEmits(['update_tag'])

  //親コンポーネントから貰う奴ら。
  const props = defineProps(['kifu_data', 'kifus', 'tags'])
  const { kifu_data, kifus, tags } = toRefs(props)
  console.log(kifu_data)
  const csrf_token = inject('csrf_token')
  const loginFlg = inject('loginFlg')
  const user_id = inject('user_id')
  const tag = inject('tag')

  //子コーポネントに流すやつら
  provide('csrf_token',csrf_token)
  provide('loginFlg',loginFlg)
  provide('user_id',user_id)

  defineExpose( { kifus, kifu_data, tags } )
  watch(kifu_data,async()=>{
    console.log(kifu_data.value)
  })
</script>

<style scoped>
  .control_data{
    margin-bottom: 1vh;
  }
</style>