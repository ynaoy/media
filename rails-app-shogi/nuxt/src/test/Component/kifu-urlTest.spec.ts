import { describe, it, expect, vi, afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import KifuUrl from "../../components/kifus/kifu-url.vue"

describe("kifu-url test", async() => {

  // $fetchメソッドをモックする。APIと通信するメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)

  // テストヘルパーの呼び出し
  const { Mount } = MountHelper()
  const { kifus_data, set_date } = TestHelper("")

  // コンポーネントのマウント
  const kifus = kifus_data(2)
  const wrapper_with_delete = Mount( KifuUrl, { user_id: 1 },
                                    { kifu: kifus[0]}) 
  const wrapper_with_not_delete = Mount( KifuUrl, { user_id: 1 },
                                    { kifu: kifus[1]})
  
  afterAll(()=>{
    vi.clearAllMocks
  })

  it("テキストが正しく表示されているかチェック", () => {
    kifu_text_check(wrapper_with_delete, kifus[0])
    expect(wrapper_with_delete.text()).toContain("delete")

    kifu_text_check(wrapper_with_not_delete, kifus[1])
    expect(wrapper_with_not_delete.text()).not.toContain("delete")
  })

  it("delete_kifuメソッドが正し呼び出されているかチェック", async() => {
    const element = wrapper_with_delete.find("#deleteUrl")
    expect(element.exists()).toBeTruthy()
    element.trigger('click')
    await wrapper_with_delete.vm.$nextTick()
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("titleが設定されているときにテキストが正しく表示されているかチェック", () => {
    let title="this is title", created_at = set_date()

    const wrapper_with_title = Mount( KifuUrl, { user_id: 1, csrf_token:"this is csrf_token" },
                                          { kifu: { title: title,
                                                    user_id: 1,
                                                    created_at: created_at}})
    expect(wrapper_with_title.text()).toContain(wrapper_with_title.vm.timewithzone_to_str(created_at,false))
    expect(wrapper_with_title.text()).toContain(title)

    expect(wrapper_with_title.text()).not.toContain("先手")
    expect(wrapper_with_title.text()).not.toContain("後手")
    expect(wrapper_with_title.text()).not.toContain("VS")
    expect(wrapper_with_title.find("#win").exists()).toBeFalsy()
  })

  // textが正しく表示されているかチェック用のメソッド
  function kifu_text_check(wrapper,kifu){

    expect(wrapper.text()).toContain("先手")
    expect(wrapper.text()).toContain("後手")
    expect(wrapper.text()).toContain("VS")
    expect(wrapper.find("#win").exists()).toBeTruthy()
    expect(wrapper.text()).toContain(kifu.player1)
    expect(wrapper.text()).toContain(kifu.player2)
    expect(wrapper.text()).toContain(wrapper.vm.timewithzone_to_str(kifu.created_at,false))

  }

})