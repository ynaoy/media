import { reactive,Ref } from 'vue'

export const  mainBoardObject = (board_text:Ref<string[][]>, board_flg:Ref<number[][]>)=>{

  //リアクティブな変数群
  const main_board_states =reactive({ })

  //メソッド群

  // nには0..80以下の整数が入る。それをlist[i][j]の形に変換する
  const compute_i= (n:number):number =>{
    return Math.floor((n)/9)
  }

  const compute_j= (n:number):number =>{
    return (n)%9
  }

  const setStyle= (n:number):string =>{
    if(board_flg.value[compute_i(n)][compute_j(n)] == 2){
      return "transform: scale(-1,-1);"
    }
  }

  const main_board_methods = {  'compute_i': compute_i,
                                'compute_j': compute_j,
                                'setStyle': setStyle}
  return { main_board_states, main_board_methods }
}