import { reactive,Ref } from 'vue'

export const subBoardObject = ( sub_board_text: Ref<string[][]>,
                                sub_board_num: Ref<number[][]>, 
                                sub_board_id: number)=>{

  //リアクティブな変数群
  const sub_board_states =reactive({ })

  //メソッド群
  const process_num = <T>(num:T):string|void =>{
    if(num!="") return "×"+num
  }

  const sub_board_methods = { 'process_num': process_num }
  return { sub_board_states, sub_board_methods }
}