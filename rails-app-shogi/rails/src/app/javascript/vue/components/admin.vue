<template>
  <div class= admin >
    <img class= back_img id= back_10 src="../../images/next_to_10_times.png" alt="前へ×10" v-on:click= "update_state('down_10')">
    <img class= back_img id= back_1 src="../../images/next_to.png" alt="前へ" v-on:click= "update_state('down')">
    <div id= "state">
      <p> {{ this.state.value }} </p>
    </div>
    <img id= next_1 src="../../images/next_to.png" alt="次へ" v-on:click= "update_state('up')">
    <img id= next_10 src="../../images/next_to_10_times.png" alt="次へ×10" v-on:click= "update_state('up_10')">
  </div>
</template>

<script>

export default {

  inject: {
    board_flg:['board_flg'],
    board_text:['board_text'],
    state:['state'],
    max_state:['max_state'],
  },

  methods:{
    update_state(str){
      if(str=="down"){
        (this.state.value-1<0)? this.$emit('update_state', 0): this.$emit('update_state', this.state.value-1)
      }
      else if(str=="down_10"){
        (this.state.value-10<0)? this.$emit('update_state', 0): this.$emit('update_state', this.state.value-10)
      }
      else if(str=="up"){
        (this.state.value+1>this.max_state.value)? this.$emit('update_state', this.max_state.value):this.$emit('update_state', this.state.value+1)
      }
      else if(str=="up_10"){
        (this.state.value+10>this.max_state.value)? this.$emit('update_state', this.max_state.value):this.$emit('update_state', this.state.value+10)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.admin{
  margin-top: 20px;
  margin-left: 139px;
  display: flex;
}
img{
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
  width:6%;
  height:6%;
}
.back_img{
  transform: scale(-1, 1);
}
#state{
  width: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px;
  border-radius: 4px;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>