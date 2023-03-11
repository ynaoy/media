<template>
  <div class="kento-items">
    <p> 評価値： {{ show_cp(kento) }} </p>
    <p  v-for="(n,key) in [0,2,4,6,8]" :key="key" class ="pv" >
      {{ show_pv(kento,n) }} {{ show_pv(kento,n+1) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { Ref } from 'vue'

  //親コンポーネントから貰う変数群
  const kento: null|string|{[key:string]:any} = inject('kento')
  const state: Ref<number>                    = inject('state')

  //このコンポーネントで使うメソッド

  // 評価値を表示する
  const show_cp = (kento)=>{
    return kento[state.value]["cp"]
  }
  // 候補手を表示する
  const show_pv = (kento,n)=>{
    if(n < kento[state.value]["pv"].length){
      return kento[state.value]["pv"][n] 
    }
  }

  defineExpose({ kento, state, show_cp, show_pv})
</script>

<style lang="scss" scoped>
  p{
    margin: 0.3vh 0;
  }
  .kento-items{
    width: 13.1vw;
    height: 17vh;
    font-size: 0.95vw;
    margin: 0 0.751vw;
    background-color:white;
    border-width: 1px;
  }
  .pv{
    font-size: 1.75vh;
    margin: 0;
  }
</style>