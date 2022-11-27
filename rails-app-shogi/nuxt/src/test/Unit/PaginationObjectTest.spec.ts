import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { PaginationObject }  from "../../composables/PaginationObject"

describe("PaginationObject test", () => {

  //メソッドに渡す変数群
  const { kifus_data } = TestHelper("")

  //このテストでチェックするやつら
  const { currentPage, set_pageNum, get_items } = PaginationObject(20)
  
  it("set_pageNumが正しく動作しているかチェック", () => {
      expect(currentPage.value).toBe(1)
      set_pageNum(2)
      expect(currentPage.value).toBe(2)
  })

  it("get_itemsが正しく動作しているかチェック", () => {
    const kifus = kifus_data()
    currentPage.value = 1
    let items = get_items(kifus)
    expect(items[0].id).toBe(0)

    currentPage.value = 2
    items = get_items(kifus)
    expect(items[0].id).toBe(20)
  })

})
