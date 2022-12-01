<template>
  <div>
    <kifuKentoItems v-if="is_kento(kento)" id="kento_result"/>
    <div v-else-if="my_kifu">
      <div v-if="kento=='processing_now'">  検討中... </div>
      <button v-else @click = "send_kentos" id="send_kentos">
        ソフトに自動検討させる 
      </button>
    </div>
  </div>
</template>

<script setup>
  import kifuKentoItems from './kifu-kento-items.vue'

  //親コンポーネントから貰う変数群
  const my_kifu     = inject('my_kifu')
  const kento       = inject('kento')
  const state       = inject('state')
  const send_kentos = inject('send_kentos')
  console.log(my_kifu)
  console.log(kento)
  console.log(state.value)
  
  //子コンポーネントに渡す変数群
  provide('kento', kento)
  provide('state', state)
  //このコンポーネントで使うメソッド群

  //kento変数がnullかprocessing_nowならfalse、そうでないならtrueを返す
  const is_kento = (item)=>{ return !((item == null)||(item=='processing_now'))}

  defineExpose({ kento, my_kifu, is_kento, send_kentos})
</script>

<style lang="scss" scoped>
  div{
    text-align: center;
  }
  button{
    font-size: 0.95vw;
    margin: 0.751vw;
    margin-bottom: 4vh;
    background-color:white;
    border-width: 1px;
  }
</style>