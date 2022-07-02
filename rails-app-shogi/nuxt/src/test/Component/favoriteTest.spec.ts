import { describe, it, expect,vi, afterEach} from 'vitest'
import { ref } from 'vue'
import { MountHelper } from "../TestHelper"
import favorite from "../../components/kifus/favorite.vue"

describe("admin test", async() => {

  //テストメソッド内で使われるHelperをモック、コンポーネントをマウント、テストヘルパーの呼び出し
  const { Mount } = MountHelper()
  const wrapper = Mount(favorite,{  loginFlg: ref(true),
                                    favorite_flg: ref(false),
                                    processing:ref(false)})
  
  //change_favorite関数が呼び出されているかのチェック用
  const spy = vi.spyOn(wrapper.vm,"change_favorite")
  await wrapper.vm.$forceUpdate()

  afterEach(async() =>{
    //初期状態に戻す
    spy.mockClear()
    wrapper.vm.loginFlg = true
    wrapper.vm.favorite_flg = false
    wrapper.vm.processing = false
    wrapper.emitted().change_favorite = []
    await wrapper.vm.$nextTick()
    }
  )

  it("loginFlg == falseの時何も表示されない", async() => {
    wrapper.vm.loginFlg = false
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).not.toContain("お気に入りから削除")
    expect(wrapper.text()).not.toContain("お気に入りに追加")
  })

  it("favorite_flg == trueの時お気に入りから削除が表示される", async() => {
    wrapper.vm.favorite_flg = true
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain("お気に入りから削除")
    expect(wrapper.text()).not.toContain("お気に入りに追加")
  })

  it("favorite_flg == falseの時お気に入りに追加", async() => {
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain("お気に入りに追加")
    expect(wrapper.text()).not.toContain("お気に入りから削除")
  })
  
  describe("change_favoriteメソッド", ()=>{

    it("お気に入りボタンを押したときにchange_favoriteメソッドが正しく動作している", async() => {
        wrapper.find(".favorite_button").trigger('click')
        await wrapper.vm.$nextTick()
        //change_favorite関数が呼び出されているかチェック
        expect(spy).toHaveBeenCalled()
        expect(wrapper.emitted().change_favorite[0][0]).toBe(!wrapper.vm.favorite_flg)
      })
      
  })
})