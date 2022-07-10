import { describe, it, expect } from 'vitest'
import { MountHelper } from "../TestHelper"
import kifuTag from "../../components/kifus/kifu-tag.vue"

describe("kifu-tag test", async() => {

  //テストヘルパーの呼び出しとコンポーネントをマウント
  const { Mount } = MountHelper()
  const wrapper = Mount( kifuTag,{},{ tags: [{name:"角換わり"}, {name:"相掛かり"}] })

  it("コンポーネントが表示されているかチェック", () => {

    expect(wrapper.text()).toContain("角換わり")
    expect(wrapper.text()).toContain("相掛かり")
    
  })

})