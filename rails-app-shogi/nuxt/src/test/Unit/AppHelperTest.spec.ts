import { describe, it, expect } from 'vitest'
import { AppHelper }from "../../composables/AppHelper"

describe("AppHelper test", () => {

  //このテストでチェックするやつら
  const { check_is_empty } = AppHelper()
  describe("check_is_empty", ()=>{

    it("引数がArrayの時に正しく動作するかチェック", () => {
      expect(check_is_empty([])).toBe(false)
      expect(check_is_empty([ {test:"Test"} ])).toBe(true)
    })

    it("引数が連想配列の時に正しく動作するかチェック", () => {
      expect(check_is_empty({})).toBe(false)
      expect(check_is_empty({test:"Test"})).toBe(true)
    })
  })
  
})