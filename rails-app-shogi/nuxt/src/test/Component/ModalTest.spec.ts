import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import { mount,shallowMount } from "@vue/test-utils"
import Modal from "../../components/Modal.vue"

describe("SModal test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()

  let stub_template = { template:  `<div>
                                      <slot name="title"> </slot>
                                      <slot> </slot>
                                      <slot name="footer"> </slot>
                                    </div>`
                      }
  const wrapper = Mount(Modal,  { is_test:true,
                                  reactive_model: ref(true)},
                                {},
                                { "b-modal": stub_template },
                                { title:"this is title",
                                  content: "this is content",
                                  footer: "this is footer"},
                                false
                                  )

  const { check_text } = TestHelper(wrapper)

  afterAll(()=>{
    vi.clearAllMocks
  })

  describe("Modal show",async()=> {

    it("Test時以外は'demo modal'ボタンが表示されない", async() => {
      const wrapper_not_test = Mount(Modal,{  is_test:null,
                                              reactive_model: ref(true),},
                                            {},
                                            { "b-modal": stub_template},
                                            { title:"this is title",
                                              content: "this is content",
                                              footer: "this is footer"},
                                            false )
      expect(wrapper_not_test.text()).not.toContain("demo modal")
    })

  })

  it("テキストが正しく表示されているかチェック", async() => {
    check_text(["this is title",
                "this is content",
                "this is footer"
              ])
  })

})