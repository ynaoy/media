import { describe, it, expect,vi, afterAll } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import NavBar from "../../components/NavBar.vue"

describe("NavBar test", async() => {

  // $fetchメソッドをモックする。APIと通信するメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const { Mount } = MountHelper()
  const wrapper = Mount(NavBar,{  csrf_token:"this is csrf_token",
                                  loginFlg:false,
                                  user_name:"TestUser",  })
  const { check_text, check_form } = TestHelper(wrapper)

  afterAll(()=>{
    // モックを初期化
    vi.clearAllMocks
  })

  it("ログインしてない時にテキストが正しく表示されているかチェック", async() => {
    check_text(['将棋のお時間','ログイン','新規登録'])
    check_form(["input[type='text']"])
    expect(wrapper.find("input[type='submit']").element.value).toBe("検索")
  })

  it("ログイン時にテキストが正しく表示されているかチェック", async() => {
    await (wrapper.vm.loginFlg = true)
    await (wrapper.vm.user_name = "TestUser")
      
    check_text(['将棋のお時間','Log out','Setting'])
    check_form(["input[type='text']"])
      
    expect(wrapper.find("input[type='submit']").element.value).toBe("検索")
    expect(wrapper.text()).not.toContain('ログイン')
  })
  it("ログイン時にドロップダウンが正しく動作しているか",async()=>{
    //----------------------------------------------------------------------
    //bootstrap-vue-3はクライアント上でしか動作しないため、テストができない
    //解決法思いついたらテスト追加する
    //----------------------------------------------------------------------

    //await (wrapper.vm.loginFlg = true)
    //ドロップダウンが存在するかの確認。
    //ドロップダウンクリック後、機能しているかを"aria-expanded"属性を元にチェック
    //expect(wrapper.find(".dropdown").exists()).toBeTruthy()
    //expect(wrapper.find(".dropdown-toggle").exists()).toBeTruthy()
    //expect(wrapper.find(".dropdown-toggle").aria-expanded).toBeFalsy()
    //wrapper.find(".dropdown-toggle").trigger('click')
    //expect(wrapper.find(".dropdown-toggle").aria-expanded).toBeTruthy()
  })

  it("検索フォームが正しく機能しているかチェック", async() => {
    // 検索ボタンクリック後こいつが呼ばれたら成功
    const spy_submit = await vi.spyOn(wrapper.vm, "submit")
    await wrapper.vm.$forceUpdate()

    // 値をセットして、検索ボタンをクリック
    wrapper.find("input[type='text']").setValue("TestUser")
    wrapper.find("input[type='submit']").trigger("click")

    // 内部の値が変化しているかと、画面遷移するためのメソッドが呼ばれているかチェック
    expect(wrapper.vm.search_form.text).toBe("TestUser")
    expect(spy_submit).toHaveBeenCalled()
  })
})