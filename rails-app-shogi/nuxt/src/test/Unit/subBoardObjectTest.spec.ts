import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { mockFetch } from "vi-fetch"
import  subBoardObject  from "../../composables/kifus/subBoardObject"

describe("subBoardObject test", () => {

  //このテストでチェックするやつら
  const { sub_board_methods } = subBoardObject( "","","")
  const { process_num } = sub_board_methods

  it("process_numメソッドが正しく動作するかチェック", () => {
    let num = process_num(1)
    expect(num).toBe("×"+1)

    num = process_num("")
    expect(num).toBe(undefined)
  })

})