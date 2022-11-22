import { describe, it, expect, vi} from 'vitest'
import { MountHelper } from "../TestHelper"
import KifuKento from "../../components/kifus/kifu-kento.vue"

describe("kifu-kento test", async() => {

  // コンポーネントをマウント、テストヘルパーの呼び出し
  const { Mount } = MountHelper()
  const wrapper = Mount(KifuKento,{ kento:"Test kento" })

  //show_kento関数が呼び出されているかのチェック用
  const spy = vi.spyOn(wrapper.vm,"show_kento")
  await wrapper.vm.$forceUpdate()

  it("kento === undefindの時正しく表示されているか", async() => {
    // このテスト用のコンポーネントをマウント
    const wrapper_undefind = Mount(KifuKento,{ kento: undefined })

    expect(wrapper_undefind.text()).toContain("ソフトに自動検討させる")
    expect(wrapper_undefind.text()).not.toContain("ソフトの読み筋を表示")
  })

  it("kento !== undefindの時正しく表示されているか", async() => {
    expect(wrapper.text()).toContain("ソフトの読み筋を表示")
    expect(wrapper.text()).not.toContain("ソフトに自動検討させる")
  })

  it("ソフトの読み筋を表示ボタンをクリック後、正しく表示されているか", async() => {
    //#kento_resultボタンをクリックしてコンポーネント内の変数を更新
    wrapper.find('#kento_button').trigger('click')
    await wrapper.vm.$nextTick()
    console.log(wrapper.vm)
    //show_kento関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()

    expect(wrapper.text()).toContain("ソフトの読み筋表示してます")
    expect(wrapper.text()).not.toContain("ソフトの読み筋を表示")
  })

})