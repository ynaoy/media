<template>
  <div>
    <div v-if="is_kento(kento)" id="kento_result"> ソフトの読み筋表示してます </div>
    <div v-else-if="my_kifu">
      <div v-if="kento=='processing_now'">  検討中... </div>
      <button v-else > ソフトに自動検討させる </button>
    </div>
  </div>
</template>

<script setup>

  //親コンポーネントから貰う変数群
  const my_kifu   = inject('my_kifu')
  const kento     = inject('kento')
  console.log(my_kifu)
  console.log(kento)
  
  //子コンポーネントに渡す変数群
  provide('kento', kento)

  //このコンポーネントで使うメソッド群

  //kento変数がnullかprocessing_nowならfalse、そうでないならtrueを返す
  const is_kento = (item)=>{ return !((item == null)||(item=='processing_now'))}

  defineExpose({ kento, my_kifu, is_kento})
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