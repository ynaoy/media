import { describe, it, expect,vi,afterAll, beforeAll} from 'vitest'
import { mount,shallowMount } from "@vue/test-utils";
import { TestHelper } from "../TestHelper"
import KifuShow from "../../components/KifuShow.vue";

export default async function KifuShowTest(){
  //テストメソッド内で使われるHelperをモック、コンポーネントをマウント、テストヘルパーの呼び出し
  vi.stubGlobal("KifuHelper",vi.fn().mockReturnValue({ 
    "get_kifu": vi.fn().mockResolvedValue({ kifu_data:"kifu_data" })
  }))
  const wrapper = await shallowMount(KifuShow,{ propsData: {
    id: 1
  }})
  const { check_text } = TestHelper(wrapper)

  describe("KifuShow test", async() => {

    afterAll(()=>{
      vi.clearAllMocks
    })

    it("テキストが正しく表示されているかチェック", async() => {
      const texts = ["1"]
      check_text(texts)
    })
  })
}