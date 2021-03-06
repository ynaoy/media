import { reactive } from 'vue'

export default function adminObject(state, max_state,context){

  //リアクティブな変数群
  const admin_states =reactive({ })

  //メソッド群

  //strに応じて"update_state"イベントを発火させる。
  //strが"down"は-1、"down_10"は-10,"up"は+1,"up_10"は+10、stateを増やす
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

  const admin_methods = { 'update_state': update_state }
  return { admin_states, admin_methods }
}