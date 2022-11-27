import { describe, it, expect, vi} from 'vitest'
import { MountHelper } from "../TestHelper"
import KifuKento from "../../components/kifus/kifu-kento.vue"

describe("kifu-kento test", async() => {

  // コンポーネントをマウント、テストヘルパーの呼び出し
  const { Mount } = MountHelper()
  const wrapper = Mount(KifuKento,{ kento:"Test kento", my_kifu:true })


  describe("my_kifu == trueの時", async() => {
    it("kento == processing_nowの時、「検討中...」が表示されている", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_pnow = Mount(KifuKento,{ kento: "processing_now", my_kifu:true })
      expect(wrapper_pnow.text()).toContain("検討中...")
      expect(wrapper_pnow.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper_pnow.text()).not.toContain("ソフトの読み筋表示してます")
    })

    it("kento == nullの時、「ソフトに自動検討させる」が表示されている", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_null = Mount(KifuKento,{ kento: null, my_kifu:true })

      expect(wrapper_null.text()).toContain("ソフトに自動検討させる")
      expect(wrapper_null.text()).not.toContain("検討中...")
      expect(wrapper_null.text()).not.toContain("ソフトの読み筋表示してます")
    })

    it("それ以外の時、「ソフトの読み筋を表示」が表示されている", async() => {
      expect(wrapper.text()).toContain("ソフトの読み筋表示してます")
      expect(wrapper.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper.text()).not.toContain("検討中...")
    })
  })
  
  describe("my_kifu == falseの時", async() => {
    it("kento == processing_nowの時、すべて表示されていない", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_pnow = Mount(KifuKento,{ kento: "processing_now", my_kifu:false })
      expect(wrapper_pnow.text()).not.toContain("ソフトの読み筋表示してます")
      expect(wrapper_pnow.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper_pnow.text()).not.toContain("検討中...")
    })

    it("kento == nullの時、すべて表示されていない", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_null = Mount(KifuKento,{ kento: null, my_kifu:false })
      expect(wrapper_null.text()).not.toContain("ソフトの読み筋表示してます")
      expect(wrapper_null.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper_null.text()).not.toContain("検討中...")
    })

    it("それ以外の時、「ソフトの読み筋を表示」が表示されている", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_disp = Mount(KifuKento,{ kento: "Test kento", my_kifu:false })
      expect(wrapper_disp.text()).toContain("ソフトの読み筋表示してます")
      expect(wrapper_disp.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper_disp.text()).not.toContain("検討中...")
    })
  })

})