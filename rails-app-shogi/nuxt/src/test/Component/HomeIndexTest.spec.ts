import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import HomeIndex from "../../components/HomeIndex.vue"
import { TagHelper } from "../../composables/TagHelper"

describe("HomeIndex test", async() => {
  
  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()

  const { kifus_data, kifu_data } = TestHelper()
  const { get_all_tag } = TagHelper()
  const wrapper = Mount(HomeIndex,  
                          { csrf_token:"this is csrf_token", 
                            loginFlg: false,
                            user_id: 1,
                            tag: ref("全て")},
                          { kifu_data: ref(kifu_data()),
                            kifus: ref(kifus_data()),
                            tags: get_all_tag()},
                        )


  afterAll(()=>{
    vi.clearAllMocks
  })

  it("子コンポーネントが表示されているかチェック", () => {
    expect(wrapper.html()).toContain("<kifu")
    expect(wrapper.html()).toContain("<kifu-tag")
    expect(wrapper.html()).toContain("<kifus-items")
  })

  it("リロードボタンをクリックした時に正しく動作しているかチェック", async() => {
    //リロードボタンをクリック
    wrapper.find(".reload_button").trigger('click')

    //処理中になっているかチェック
    expect(wrapper.vm.processing).toBeTruthy()

    //棋譜情報が更新されたらprocessing変数がfalseになる
    let new_kifu = kifu_data()
    new_kifu.kifu_id = 2
    wrapper.vm.kifu_data = new_kifu
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.processing).toBeFalsy()
  })
  
})