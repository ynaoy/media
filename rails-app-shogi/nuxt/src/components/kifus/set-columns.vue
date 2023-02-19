<template>
  <div id="columns">
    <div v-for= "(key,n) in 9" :key="key" id="col"> {{ columns[n] }} </div>
  </div> 
</template>

<script lang="ts" setup>

  const columns = ["一","二","三","四","五","六","七","八","九"]

</script>

<style lang="scss" scoped>
  #columns{
    height: 22.99vw;
    border:  none;
    font-size: 0.676vw;
  }
  #col{
    height:2.554vw;
    display: flex;
    text-align: center;
    align-items: center;
  }
</style>