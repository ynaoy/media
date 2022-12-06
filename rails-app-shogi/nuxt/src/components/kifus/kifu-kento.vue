<template>
  <div>
    <kifuKentoItems v-if="is_kento(kento)" id="kento_result"/>
    <div v-else-if="my_kifu">
      <div v-if="kento=='processing_now'">  検討中... </div>
      <button v-else @click = "kento_and_fetch()" id="kento_and_fetch">
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
  const post_kentos = inject('post_kentos')
  const fetch_kentos_interval = inject('fetch_kentos_interval')
  console.log(my_kifu)
  console.log(kento.value)
  console.log(state.value)
  
  //子コンポーネントに渡す変数群
  provide('kento', kento)
  provide('state', state)

  //このコンポーネントで使う変数群
  //もし検討中なら1分(60000ms)ごとにapiと通信してkento変数を更新する。
  const timer = ref(fetch_kentos_interval(60000))

  //このコンポーネントで使うメソッド群

  //kento変数がnullかprocessing_nowならfalse、そうでないならtrueを返す
  const is_kento = (item)=>{ 
    return !((item == null)||(item=='processing_now'))}

  //検討ボタンが押された時の処理。
  //検討の処理は時間がかかるのでapiのバックグラウンドで実行される。
  //定期的にapiと通信して処理が終わっていればkento変数が更新される
  const kento_and_fetch  = ()=>{ 
    post_kentos()
    timer.value = fetch_kentos_interval(60000,timer.value)
  }

  onBeforeUnmount( ()=>{clearInterval(timer.value)} )

  defineExpose({ kento, my_kifu, is_kento, post_kentos, kento_and_fetch,})
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