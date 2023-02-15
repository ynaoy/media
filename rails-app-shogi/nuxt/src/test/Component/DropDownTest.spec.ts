import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import DropDown from "../../components/DropDown.vue"
import { TagHelper } from "../../composables/TagHelper"

describe("DropDown test", async() => {
  
  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()

  const text = ref("this is text")
  const items = ref(["a","b","c"])
  const click_callback = (value)=> {}
  const wrapper = Mount(DropDown,  
                          {},
                          { text: text,
                            items: items, 
                            click_callback: click_callback, },
                        )
  it("ドロップダウンが正しく動作しているか",async()=>{
    //----------------------------------------------------------------------
    //bootstrap-vue-3はクライアント上でしか動作しないため、テストができない
    //解決法思いついたらテスト追加する
    //----------------------------------------------------------------------
  })
  
})