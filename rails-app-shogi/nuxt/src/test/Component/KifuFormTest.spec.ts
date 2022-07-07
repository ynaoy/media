import { describe, it, expect,vi,afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import KifuForm from "../../components/KifuForm.vue"

describe("KifuForm test", async() => {

  //テストメソッド内で使われるHelperをモック
  vi.stubGlobal("KifuHelper",vi.fn().mockReturnValue({ "create_kifu": vi.fn()}))

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const wrapper = Mount( KifuForm,{  csrf_token:"this is csrf_token" },{ tags: ["Tag_tes1","Tag_Test2"]}) 
  const { check_text, check_form, set_form } = TestHelper(wrapper)

  afterAll(()=>{
    vi.clearAllMocks
  })

  it("フォームが正しく動作しているかチェック", async() => {

    const forms = [ "#kifu_title", "#kifu_player1", "#kifu_player2", "#kifu_content"]
    const forms_check = ["#kifu_tag_ids_1","#kifu_tag_ids_2"]
    const values = ["title", "player1", "player2", "kifu",]

    //フォームが存在するかチェック
    check_form(forms)
    check_form(forms_check)

    //submit関数が呼び出されているかのチェック用
    const spy = await vi.spyOn(wrapper.vm,"submit")
    await wrapper.vm.$forceUpdate()

    //チェックボックスをチェックして、かつ値が変わっているか確認
    for (let key in forms_check){ 
      await wrapper.find(forms_check[key]).setChecked()
      expect(wrapper.find(forms_check[key]).element.checked).toBeTruthy()
    }
    //フォームに値を入力
    await set_form(forms, values)

    //submitをクリックして値を更新
    wrapper.find("input[type='submit']").trigger('click')
    await wrapper.vm.$nextTick()

    //フォームに正しく反映されているかチェック
    expect(wrapper.vm.kifu_form.title).toBe(values[0])
    expect(wrapper.vm.kifu_form.player1).toBe(values[1])
    expect(wrapper.vm.kifu_form.player2).toBe(values[2])
    expect(wrapper.vm.kifu_form.content).toBe(values[3])
    expect(wrapper.vm.kifu_form.tag.tag_ids).toStrictEqual([1,2])

    //submit関数が呼び出されているかチェック
    expect(spy).toHaveBeenCalled()

  })
})