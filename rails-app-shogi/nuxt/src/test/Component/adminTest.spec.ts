import { describe, it, expect,vi, afterEach} from 'vitest'
import { ref } from 'vue'
import { MountHelper,TestHelper } from "../TestHelper"
import admin from "../../components/kifus/admin.vue"

describe("admin test", async() => {

  //テストメソッド内で使われるHelperをモック、コンポーネントをマウント、テストヘルパーの呼び出し
  const { Mount } = MountHelper()
  const wrapper = Mount(admin,{ state: ref(0), max_state: ref(10)})
  const { check_text, check_form } = TestHelper(wrapper)
  
  //update_state関数が呼び出されているかのチェック用
  const spy = vi.spyOn(wrapper.vm,"update_state")
  await wrapper.vm.$forceUpdate()

  afterEach(async() =>{
    //初期状態に戻す
    spy.mockClear()
    wrapper.vm.state = 0
    wrapper.emitted().update_state = []
    await wrapper.vm.$nextTick()
    }
  )
  it("テキストが正しく表示されているかチェック", () => {
    check_text([0])
    check_form(["#back_10","#back_1","#next_1","#next_10"])
  })

  describe("upadate_stateメソッド", ()=>{

    describe("update_state(down_10)ボタンが正しく動作しているかチェック",()=>{

      it("update_state(down_10)ボタンでstateがマイナス10される", async() => {
        wrapper.vm.state = 10
        await wrapper.vm.$nextTick()
        check_update_state("#back_10", 0)
      })

      it("update_state(down_10)ボタンでstateが0以下ならstateの値が0になる", async() => {
        await wrapper.vm.$nextTick()
        check_update_state("#back_10", 0)
      })

    })

    describe("update_state(down)ボタンが正しく動作しているかチェック",()=>{

      it("update_state(down)ボタンでstateがマイナス1される", async() => {
        wrapper.vm.state = 1
        await wrapper.vm.$nextTick()
        check_update_state("#back_1", 0)
      })

      it("update_state(down)ボタンでstateが0以下ならstateの値が0になる", async() => {
        await wrapper.vm.$nextTick()
        check_update_state("#back_1", 0)
      })
      
    })

    describe("update_state(up)ボタンが正しく動作しているかチェック",()=>{

      it("update_state(up)ボタンでstateがプラス1される", async() => {
        check_update_state("#next_1", 1)
      })

      it("update_state(up)ボタンでstateがmax_state以上ならstateの値がmax_stateになる", async() => {
        wrapper.vm.state = wrapper.vm.max_state
        await wrapper.vm.$nextTick()
        check_update_state("#next_1", wrapper.vm.max_state)
      })
      
    })

    describe("update_state(up_10)ボタンが正しく動作しているかチェック",()=>{

      it("update_state(up_10)ボタンでstateがプラス10される", async() => {
        check_update_state("#next_10", 10)
      })

      it("update_state(up_10)ボタンでstateがmax_state以上ならstateの値がmax_stateになる", async() => {
        wrapper.vm.state = wrapper.vm.max_state
        await wrapper.vm.$nextTick()
        check_update_state("#next_10", wrapper.vm.max_state)
      })
      
    })

    //このテストで使うメソッド
    async function check_update_state(selector, new_state){

      //selectorをクリックしてリアクティブな変数を更新
      wrapper.find(selector).trigger('click')
      await wrapper.vm.$nextTick()
      //update_state関数が呼び出されているかチェック
      expect(spy).toHaveBeenCalled()
      expect(wrapper.emitted().update_state[0][0]).toBe(new_state)
    }
  })

})