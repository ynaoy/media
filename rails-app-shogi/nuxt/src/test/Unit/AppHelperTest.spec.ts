import { describe, it, expect } from 'vitest'
import { AppHelper }from "../../composables/AppHelper"

describe("AppHelper test", () => {

  //このテストでチェックするやつら
  const { check_is_empty } = AppHelper()

  it("check_is_emptyメソッドが正しく動作するかチェック", () => {
    expect(check_is_empty([])).toBe(false)
    expect(check_is_empty([ {test:"Test"} ])).toBe(true)
  })
  
})