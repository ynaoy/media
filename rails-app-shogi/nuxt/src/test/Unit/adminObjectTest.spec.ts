import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { ref, defineEmits } from "vue"
import  adminObject  from "../../composables/kifus/adminObject"

describe("adminObject test", () => {

  //メソッドに渡す変数群
  let state = ref(0)
  const max_state = ref(10)
  const emit =  vi.fn((emit, new_state) => { return new_state })

  //このテストでチェックするやつら
  const { admin_methods } = adminObject(state, max_state, emit)
  const { update_state } = admin_methods

  describe("update_stateメソッドが正しく動作するかチェック", () => {

    function check_update_state(str:String, new_state:number){
      update_state(str)
      expect(emit).toHaveBeenCalled()
      console.log(emit.mock.results[0].value)
      expect(emit.mock.results[0].value).toBe(new_state)
    }

    afterEach(()=>{
      state.value = 0
      emit.mockClear()
    })

    describe("引数upについて",() => {

      it("引数'up'で state.value+1 が返ってくる", () => {
        check_update_state("up", state.value+1)
      })

      it("引数'up'で stateがmax_state以上ならば、max_stateが返ってくる", () => {
        state.value = max_state.value
        check_update_state("up", max_state.value)
      })
    })

    describe("引数up_10について",() => {

      it("引数'up_10'で state.value+10 が返ってくる", () => {
        check_update_state("up_10", state.value+10)
      })

      it("引数'up_10'で stateがmax_state以上ならば、max_stateが返ってくる", () => {
        state.value = max_state.value
        check_update_state("up_10", max_state.value)
      })
    })

    describe("引数downについて",() => {

      it("引数'down'で state.value-1 が返ってくる", () => {
        state.value = 1
        check_update_state("down", state.value-1)
      })

      it("引数'down'で stateが0以下ならば、0が返ってくる", () => {
        state.value = 0
        check_update_state("down", 0)
      })
    })

    describe("引数down_10について",() => {

      it("引数'down_10'で state.value-10 が返ってくる", () => {
        state.value = 10
        check_update_state("down_10", state.value-10)
      })

      it("引数'down_10'で stateが0以下ならば、0が返ってくる", () => {
        state.value = 0
        check_update_state("down_10", 0)
      })
    })

  })
})