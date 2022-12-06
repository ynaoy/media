import { describe, it, expect, vi} from 'vitest'
import { MountHelper } from "../TestHelper"
import board from "../../components/kifus/board.vue"

describe("board test", async() => {

  //テストヘルパーの呼び出しとコンポーネントをマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(board,{ board_flg:"", board_text:"",
                                sub_board_text:"", sub_board_num:"",
                                player1:"", player2:"",
                                my_kifu: true, kento:"Test kento",state: ref(1),
                                post_kentos: vi.fn(),
                                fetch_kentos_interval: vi.fn()})

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).contain("<left-board")
    expect(wrapper.html()).contain("<main-board")
    expect(wrapper.html()).contain("<right-board")
  })
})