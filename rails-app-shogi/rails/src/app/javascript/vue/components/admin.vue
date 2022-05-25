<template>
  <div class= admin >
    <img class= back_img id= back_10 src="../../images/next_to_10_times.png" alt="前へ×10" v-on:click= "update_state('down_10')">
    <img class= back_img id= back_1 src="../../images/next_to.png" alt="前へ" v-on:click= "update_state('down')">
    <div id= "state">
      <p> {{ state }} </p>
    </div>
    <img id= next_1 src="../../images/next_to.png" alt="次へ" v-on:click= "update_state('up')">
    <img id= next_10 src="../../images/next_to_10_times.png" alt="次へ×10" v-on:click= "update_state('up_10')">
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  
  name: "Admin",

  setup(props, context){

    const state = inject('state')
    const max_state = inject('max_state')

    //strに応じて"update_state"イベントを発火させる
    const update_state = function(str){
      if(str=="down"){
        (state.value-1<0)? context.emit('update_state', 0): context.emit('update_state', state.value-1)
      }
      else if(str=="down_10"){
        (state.value-10<0)? context.emit('update_state', 0): context.emit('update_state', state.value-10)
      }
      else if(str=="up"){
        (state.value+1>max_state.value)? context.emit('update_state', max_state.value):context.emit('update_state', state.value+1)
      }
      else if(str=="up_10"){
        (state.value+10>max_state.value)? context.emit('update_state', max_state.value):context.emit('update_state', state.value+10)
      }
    }

    return { state, max_state, update_state }
  },
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
  margin-right: 0.376vw;
  margin-left: 0.376vw;
  width:6%;
  height:6%;
}
.back_img{
  transform: scale(-1, 1);
}
#state{
  width:6%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px;
  border-radius: 0.301vw;
  font-size: 2.179vw;
}

</style>