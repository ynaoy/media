import { describe, it, expect } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import Pagination from "../../components/Pagination.vue"

describe("ProfileForm test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { kifus_data } = TestHelper()
  const { Mount } = MountHelper()
  const items = kifus_data(61)
  const wrapper = Mount(Pagination, {}, { items: items, 
                                          parPage:20,
                                          currentPage:1 },false)


  it("子コーポネントが表示されているかチェック", async() => {
    expect(wrapper.html()).toContain("<paginate")
  })

  it("items.length > parPage の時に子コーポネントが表示されていないかチェック", async() => {
    const wrapper_not_disp = Mount(Pagination, {}, {  items: kifus_data(1), 
                                                      parPage:20,
                                                      currentPage:1 },false)
    console.log(wrapper_not_disp.html())
    expect(wrapper_not_disp.html()).not.toContain("<paginate")
  })

  it("clickCallbackメソッドが正しく実行されているかチェック", async() => {
    wrapper.vm.clickCallback(2)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().pageNum[0][0]).toBe(2)
  })

  it("getPageCountkメソッドが正しく実行されているかチェック", async() => {
    expect(wrapper.vm.getPageCount(items)).toBe(4)
  })
})