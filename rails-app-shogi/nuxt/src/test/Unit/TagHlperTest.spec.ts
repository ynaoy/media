import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TagHelper } from "../../composables/TagHelper"

describe("TagHelper test", async() => {

  //このテストでチェックするやつら
  const { get_all_tag } = TagHelper()

  it("get_all_tagメソッドが正しく動作するかチェック", async() => {
    const tags = await get_all_tag()
    expect(tags.length).toBeGreaterThan(4)
  })

})