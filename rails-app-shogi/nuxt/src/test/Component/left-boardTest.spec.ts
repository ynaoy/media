import { describe, it, expect } from 'vitest'
import { MountHelper } from "../TestHelper"
import leftBoard from "../../components/kifus/left-board.vue"

describe("left-board test", async() => {

  //テストヘルパーの呼び出しとコンポーネントをマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(leftBoard,{ sub_board_text:"", sub_board_num:"" })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).contain("<sub-board")
  })
})