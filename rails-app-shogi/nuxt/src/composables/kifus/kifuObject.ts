import { reactive, computed, } from 'vue'

export const  kifuObject = (kifu_data)=>{

    //リアクティブでない変数群
    const sub_board_label = ["飛","角","金","銀","桂","香","歩","玉"]

    //リアクティブな変数群
    const kifu_states =reactive({
        state: 0,
        max_state: computed(()=>kifu_data.value.kifu_text.length-1),
        board_text: [],     //[n][8][8]
        board_flg: [],      //[n][10][8] ※[n][9][8]と[n][10][8]は持ち駒の枚数
        sub_board_text: [], //[2][8]
        sub_board_num: [],  //[2][8]
    })

    //メソッド群
    
    //'update_state'イベントが発火されたら、
    //画面に表示されるリアクティブな変数を更新する
    const update_board= function(event){
        kifu_states.state = event
        kifu_states.board_text = kifu_data.value.kifu_text[kifu_states.state]
        kifu_states.board_flg = kifu_data.value.kifu_flg[kifu_states.state]
        set_sub_board()
    }

    //sub_board_textとsub_board_numを更新する
    //表示される駒をtextsに、その枚数をnumsに入れる。padsには表示されない部分を数合わせとして入れる
    //それを先手と後手二つ分用意する
    const set_sub_board = function(){
        kifu_states.sub_board_text = []
        kifu_states.sub_board_num = []
        for (let i=0; i<2; i++){
            let texts = []
            let nums = []
            let pads =[]
            for(let j=0; j<sub_board_label.length;j++){
                if(kifu_states.board_flg[9+i][j]==0){
                    pads.push("");
                    continue;
                }
            texts.push(sub_board_label[j]);
            nums.push(kifu_states.board_flg[9+i][j]);
            }
            texts= texts.concat(pads);
            nums=  nums.concat(pads);
            kifu_states.sub_board_text.push(texts);
            kifu_states.sub_board_num.push(nums);
        }
    }

    update_board(0)

    const kifu_methods = { 'update_board': update_board, }
    return { kifu_states, kifu_methods }
}

