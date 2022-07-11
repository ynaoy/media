import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { mainBoardObject } from "../../composables/kifus/mainBoardObject"

describe("mainBoardObject test", () => {

  //メソッドに渡す変数群
  const { kifu_data } = TestHelper("")

  //このテストでチェックするやつら
  const { main_board_methods } = mainBoardObject( ref(kifu_data().kifu_text[0]),
                                                  ref(kifu_data().kifu_flg[0] ))
  const { setStyle } = main_board_methods
  
  describe("setStyleメソッドが正しく動作するかチェック", () => {

    it("kifu_flg[i][j] == 2の時にstyleが付与されているか", () => {
      for (let n=0; n<81; n++){

        if( (n<=8) || (n==10) || (n==16) || ((18<=n)&&(n<=26)) ){
          expect(setStyle(n)).toBe("transform: scale(-1,-1);")
        }
        else{
          expect(setStyle(n)).toBe(undefined)
        }
      }
    })

  })
})