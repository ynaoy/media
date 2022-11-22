<template>
  <div>
    <button v-if= "kento_clicked == false"> 
      <span v-if= "is_kento(kento)" v-on:click="show_kento()" id="kento_button">
        ソフトの読み筋を表示 
      </span>
      <span v-else> ソフトに自動検討させる </span>
    </button> 
    
    <div v-else id="kento_result"> ソフトの読み筋表示してます </div>
  </div>
</template>

<script setup>

  //親コンポーネントから貰う変数群
  const kento =  inject('kento')
  
  //このコンポーネントで使う変数群
  const kento_clicked = ref(false)
  
  //子コンポーネントに渡す変数群
  provide('kento', "")

  //このコンポーネントで使うメソッド群

  //kento変数がundefindかならfalse、そうでないならtrueを返す
  const is_kento = (item)=>{ return typeof item != "undefined" }
  
  //kentoボタンがクリックされたらフラグを更新する
  const show_kento = ()=>{ kento_clicked.value = !kento_clicked.value }

  defineExpose({ kento, kento_clicked, is_kento, show_kento })
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