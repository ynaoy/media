import { describe, it, expect } from 'vitest'
import { MountHelper } from "../TestHelper"
import setIndex from "../../components/kifus/set-index.vue"

describe("set-index test", async() => {

  //テストヘルパーの呼び出しとコンポーネントをマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(setIndex)

  it("コンポーネントが表示されているかチェック", () => {
    for (let n=1; n<10; n++){
      expect(wrapper.text()).toContain(n)
    }
  })
})