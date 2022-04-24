<template>
  <div id="columns">
    <div v-for= "n in 9" id="col"> {{ columns[n-1] }} </div>
  </div> 
</template>

<script>
export default {
  name: "setColumns",
  data(){
    return{
      columns: ["一","二","三","四","五","六","七","八","九"],
    }
  },
}
</script>
<style lang="scss" scoped>
  #columns{
    height: 306px;
    border:  none;
    font-size: 9px;
  }
  #col{
    height:34px;
    display: flex;
    text-align: center;
    align-items: center;
  }
</style>