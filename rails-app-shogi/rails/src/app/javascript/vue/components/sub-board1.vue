<template>
  <div id ="sub_board1" >
    <div v-for= "n in 8" id="sub_cell">
      {{ this.sub_board_text.value[1][n-1] }} <span id="num"> {{ processed_num(this.sub_board_num.value[1][n-1]) }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "subBoard1",

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
  #sub_board1{
    display: grid;
    place-content: center;
    grid-template-columns: 2.554vw 2.554vw;
    grid-template-rows: 2.554vw 2.554vw 2.554vw 2.554vw;
    gap: 0.15vw 1.503vw;
    border: 2px solid #7F5E1E;
    margin: 0 0.751vw;
    margin-top:1.503vw;
    width: 9.016vw;
    height: 11.27vw;
    background-color: #E3A936;
  }
  #sub_cell{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.803vw;
    font-family:serif;
  }
  #num{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.902vw;
  }
</style>