import { describe, it, expect } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import mainBoard from "../../components/kifus/main-board.vue"

describe("main-board test", async() => {

  //テストヘルパーの呼び出しとコンポーネントをマウント
  const { Mount } = MountHelper()
  const { kifu_data } = TestHelper("")
  const wrapper = Mount(mainBoard,{ board_text: ref(kifu_data().kifu_text[0]),
                                    board_flg:  ref(kifu_data().kifu_flg[0]) })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).contain("<set-index")
    expect(wrapper.html()).contain("<set-columns")
  })

  it("与えられた盤面の情報が正しく表示されているかチェック", () => {

    const komas = {"王": 2, "飛": 2, "角": 2, "金": 4, "銀": 4, "桂": 4, "香": 4, "歩": 18 }
    expect(wrapper.find('#inner_board').exists()).toBe(true)

    for (let key in komas){
      //駒の名前を正規表現で検索して、ヒットした個数をテストする
      expect(wrapper.text().match(new RegExp(key,'g')).length).toBe(komas[key])
    }
  })

})