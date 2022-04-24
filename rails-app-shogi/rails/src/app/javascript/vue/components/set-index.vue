<template>
  <div id="index">
    <div v-for="n in 9" id="ind"> {{ 10-n }} </div>
  </div>
</template>

<script>
export default {
  name: "setIndex",
}
</script>
<style lang="scss" scoped>
  #index{
    display: flex;
    text-align: center;
    align-items: center;
    width: 306px;
    margin-left: 10px;
    border:  none;
    font-size: 9px;
  }
  #ind{
    width:34px;
  }
</style>