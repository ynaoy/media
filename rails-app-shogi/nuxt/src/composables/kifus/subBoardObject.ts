import { reactive } from 'vue'

export const subBoardObject = (sub_board_text, sub_board_num, sub_board_id)=>{

  //リアクティブな変数群
  const sub_board_states =reactive({ })

  //メソッド群
  const process_num = function(num){
    if(num!="") return "×"+num
  }

  const sub_board_methods = { 'process_num': process_num }
  return { sub_board_states, sub_board_methods }
}