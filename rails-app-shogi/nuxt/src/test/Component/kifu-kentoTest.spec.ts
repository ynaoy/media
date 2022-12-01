import { describe, it, expect, vi, afterEach} from 'vitest'
import { MountHelper } from "../TestHelper"
import KifuKento from "../../components/kifus/kifu-kento.vue"

describe("kifu-kento test", async() => {

  // コンポーネントをマウント、テストヘルパーの呼び出し
  const { Mount } = MountHelper()  
  const wrapper = Mount(KifuKento,{ kento:"Test kento", my_kifu:true, state: ref(1), send_kentos: vi.fn() })

  describe("my_kifu == trueの時", async() => {
    it("kento == processing_nowの時、「検討中...」が表示されている", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_pnow = Mount(KifuKento,{  kento: "processing_now", my_kifu:true,
                                              state: ref(1), send_kentos: vi.fn() })
      expect(wrapper_pnow.text()).toContain("検討中...")
      expect(wrapper_pnow.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper_pnow.html()).not.toContain("<kifu-kento-items")
    })

    it("kento == nullの時、「ソフトに自動検討させる」が表示されている", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_null = Mount(KifuKento,{  kento: null, my_kifu:true,
                                              state: ref(1), send_kentos: vi.fn()})

      expect(wrapper_null.text()).toContain("ソフトに自動検討させる")
      expect(wrapper_null.text()).not.toContain("検討中...")
      expect(wrapper_null.html()).not.toContain("<kifu-kento-items")
    })

    it("それ以外の時、「<kifu-kento-items」が表示されている", async() => {
      expect(wrapper.html()).toContain("<kifu-kento-items")
      expect(wrapper.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper.text()).not.toContain("検討中...")
    })
  })
  
  describe("my_kifu == falseの時", async() => {
    it("kento == processing_nowの時、すべて表示されていない", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_pnow = Mount(KifuKento,{  kento: "processing_now", my_kifu:false,
                                              state: ref(1), send_kentos: vi.fn()})
      expect(wrapper_pnow.html()).not.toContain("<kifu-kento-items")
      expect(wrapper_pnow.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper_pnow.text()).not.toContain("検討中...")
    })

    it("kento == nullの時、すべて表示されていない", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_null = Mount(KifuKento,{  kento: null, my_kifu:false,
                                              state: ref(1), send_kentos: vi.fn()})
      expect(wrapper_null.html()).not.toContain("<kifu-kento-items")
      expect(wrapper_null.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper_null.text()).not.toContain("検討中...")
    })

    it("それ以外の時、「<kifu-kento-items」が表示されている", async() => {
      // このテスト用のコンポーネントをマウント
      const wrapper_disp = Mount(KifuKento,{ kento: "Test kento", my_kifu:false, state: ref(1) })
      expect(wrapper_disp.html()).toContain("<kifu-kento-items")
      expect(wrapper_disp.text()).not.toContain("ソフトに自動検討させる")
      expect(wrapper_disp.text()).not.toContain("検討中...")
    })
  })

  describe("send_kentsメソッド", async() => {
    // このテスト用のコンポーネントをマウント
    const wrapper_null = Mount(KifuKento,{  kento: null, my_kifu:true, 
                                            state: ref(1), send_kentos: vi.fn()})
    //send_kentos関数が呼び出されているかのチェック用
    const spy = vi.spyOn(wrapper_null.vm,"send_kentos")
    await wrapper_null.vm.$forceUpdate()
  
    afterEach(async() =>{
      //初期状態に戻す
      spy.mockClear()
      }
    )

    it("ソフトに自動検討させるボタンを押したときにメソッドが呼び出されているか", async() => {
     //.send_kentosをクリックしてリアクティブな変数を更新
      wrapper_null.find('#send_kentos').trigger('click')
      await wrapper.vm.$nextTick()
      //send_kentos関数が呼び出されているかチェック
      expect(spy).toHaveBeenCalled()
    })
  })
})