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
import  adminObject from '../composables/adminObject'

export default {
  
  name: "Admin",

  setup(props, context){

    //リアクティブな変数群とメソッド群
    const state = inject('state')
    const max_state = inject('max_state')
    const{ admin_methods } = adminObject(state, max_state,context)

    //このコンポーネントで使うメソッド
    const update_state = admin_methods['update_state']

    return { state, update_state }
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