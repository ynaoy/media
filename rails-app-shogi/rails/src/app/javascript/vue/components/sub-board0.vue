<template>
  <div id ="sub_board0" >
    <div v-for= "n in 8" id="sub_cell">
      {{ this.sub_board_text.value[0][n-1] }} <span id="num"> {{ processed_num(this.sub_board_num.value[0][n-1]) }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "subBoard0",

  inject: {
    sub_board_text:['sub_board_text'],
    sub_board_num: ['sub_board_num'],
  },

  methods:{
    processed_num(num){
      if(num!="") return "×"+num
    }
  },
}
</script>
<style lang="scss" scoped>
  #sub_board0{
    display: grid;
    place-content: center;
    grid-template-columns: 34px 34px;
    grid-template-rows: 34px 34px 34px 34px;
    gap: 2px 20px;
    border: 2px solid #7F5E1E;
    margin: 0 10px;
    margin-bottom:25px;
    width: 120px;
    height: 150px;
    background-color: #E3A936;
  }
  #sub_cell{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family:serif;
  }
  #num{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
</style>