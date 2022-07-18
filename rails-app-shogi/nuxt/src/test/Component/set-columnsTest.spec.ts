import { describe, it, expect } from 'vitest'
import { MountHelper } from "../TestHelper"
import setColumns from "../../components/kifus/set-columns.vue"

describe("set-columns test", async() => {

  //テストヘルパーの呼び出しとコンポーネントをマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(setColumns)

  it("コンポーネントが表示されているかチェック", () => {

    const columns = ["一","二","三","四","五","六","七","八","九"]
    for (let i in columns){
      expect(wrapper.text()).toContain(columns[i])
    }
    
  })

})