import { describe, it, expect } from 'vitest'
import { MountHelper } from "../TestHelper"
import rightBoard from "../../components/kifus/right-board.vue"

describe("right-board test", async() => {

  //テストヘルパーの呼び出しとコンポーネントをマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(rightBoard,{  sub_board_text:"", 
                                      sub_board_num:"", 
                                      player1: "player1",
                                      player2: "player2",
                                      my_kifu: true,
                                      kento:"Test kento" })

  it("コンポーネントが表示されているかチェック", () => {
    expect(wrapper.text()).contain("先手:")
    expect(wrapper.text()).contain("後手:")
    expect(wrapper.text()).contain("player1")
    expect(wrapper.text()).contain("player2")
  })
})