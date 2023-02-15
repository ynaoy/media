import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { kifuObject }  from "../../composables/kifus/kifuObject"

describe("kifuObject test", () => {

  //メソッドに渡す変数群
  const { kifu_data } = TestHelper()

  //このテストでチェックするやつら
  const { kifu_states, kifu_methods } = kifuObject(ref(kifu_data()))
  const { update_board } = kifu_methods
  
  describe("update_boardメソッドが正しく動作するかチェック", () => {

    it("kifu_statesが正しく更新されているか", () => {
      update_board(1)
      expect(kifu_states.state).toBe(1)
      expect(kifu_states.board_text).toStrictEqual(kifu_data().kifu_text[1])
      expect(kifu_states.board_flg).toStrictEqual(kifu_data().kifu_flg[1])

      //state = 1ではsub_boardに、歩が一枚先手側に追加
      expect(kifu_states.sub_board_text[0]).toStrictEqual(["歩","","","","","","",""])
      expect(kifu_states.sub_board_num[0]).toStrictEqual([1,"","","","","","",""])
      //state = 1で後手側ではsub_boardに変化なし
      expect(kifu_states.sub_board_text[1]).toStrictEqual(["","","","","","","",""])
      expect(kifu_states.sub_board_num[1]).toStrictEqual(["","","","","","","",""])
    })
  })
})