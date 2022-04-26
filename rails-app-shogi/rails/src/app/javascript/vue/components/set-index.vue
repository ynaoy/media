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
    width: 22.99vw;
    margin-left: 0.751vw;
    border:  none;
    font-size: 0.676vw;
  }
  #ind{
    width:2.554vw;
  }
</style>