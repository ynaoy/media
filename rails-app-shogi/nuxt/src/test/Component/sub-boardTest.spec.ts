import { describe, it, expect } from 'vitest'
import { MountHelper } from "../TestHelper"
import subBoard from "../../components/kifus/sub-board.vue"

describe("sub-board test", async() => {

  //テストヘルパーの呼び出しと変数の宣言、コンポーネントをマウント
  const { Mount } = MountHelper()

  const sub_board_text = [["飛","角","金","銀","桂","香","歩", ""],
                          ["", "", "", "", "", "", "", ""]], 
        sub_board_num =  [[ 1, 2, 3, 4, 5, 6, 7, ""],
                          ["", "", "", "", "", "", "", ""]]

  const wrapper = Mount(subBoard,{    sub_board_text: sub_board_text,
                                      sub_board_num:  sub_board_num,
                                      sub_board_id: 0 } )

  it("コンポーネントが表示されているかチェック", () => {

    //持ち駒フィールドのclassが設定されている
    expect(wrapper.find('.sub_board sub_id-0')).toBeTruthy

    //駒が表示されない部分では "×駒の数" が表示されない
    expect(wrapper.text().match(/×/g).length).toBe(7)
    
    //順番に駒とその枚数が表示されているか確認
    for (let i=0; i<sub_board_num[0].length; i++){
      if(sub_board_num[0][i] != ''){
        expect(wrapper.text()).toContain(`${sub_board_text[0][i]} ×${sub_board_num[0][i]}`)
      }
    }
  })
})