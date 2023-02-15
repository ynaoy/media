import { describe, it, expect, vi} from 'vitest'
import { MountHelper } from "../TestHelper"
import KifuKentoItems from "../../components/kifus/kifu-kento-items.vue"

describe("kifu-kento-items test", async() => {

  // コンポーネントをマウント、テストヘルパーの呼び出し
  const { Mount } = MountHelper()
  const kento = { 0: {cp: 0, pv:[ "▲７六歩(77)","△３四歩(33)","▲７五歩(76)","△８四歩(83)","▲２六歩(27)",
                                  "△８五歩(84)","▲７七角(88)","△３二金(41)","▲２五歩(26)","△７二銀(71)",
                                  "▲４八銀(39)" ]},
                  1: {cp: 1, pv:[ "△３四歩(33)", "▲２六歩(27)"]},
                  2: {cp: 2, pv:[ "▲２二角成(88)", "△２二銀(31)"]},
                  3: {cp: 3, pv:[ "△２二銀(31)"]},
                  4: {cp: 4, pv:[ "▲８八角打"]} 
                }
  const wrapper = Mount(KifuKentoItems,{ kento: kento, state: ref(0) })
  
  it("「評価値：kento[state][cp]」が表示されている", async() => {
    expect(wrapper.text()).toContain("評価値： "+kento[0]["cp"])
  })

  it("state==0の時、pv[0:9]までが表示されて、pv[10]は表示されない", async() => {
    for (let i=0; i<10; i++){
      expect(wrapper.text()).toContain(kento[0]["pv"][i])
    }  
    expect(wrapper.text()).not.toContain(kento[0]["pv"][10])
  })

  it("state==1の時、pvが表示されていて、NaNが表示されていない", async() => {
    wrapper.vm.state = 1
    await wrapper.vm.$nextTick()

    for (let i=0; i<2; i++){
      expect(wrapper.text()).toContain(kento[1]["pv"][i])
    }  
    expect(wrapper.text()).not.toContain("NaN")
  })

  it("stateの値が変わると評価値とpvが変化する", async() => {
    for (let i=0; i<5; i++){
      wrapper.vm.state = i
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toContain("評価値： "+kento[i]["cp"])
      expect(wrapper.text()).toContain(kento[i]["pv"][0])
    }  
  })

})