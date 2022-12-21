import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { TestHelper } from "../TestHelper"
import { UserHelper } from "../../composables/UserHelper";

describe("UserHelper test", async() => {
  
  //テストヘルパーの呼び出し
  const { mock_func } = TestHelper()
  // $fetchメソッドをモックする
  const spy_fetch = mock_func("$fetch",{ data:"data" },true)
    
  //このテストでチェックするやつら
  const { create_user, update_user, get_all_user, delete_user, post_account_activations,
          get_user, get_users_history, get_users_favorite } = UserHelper()

  afterAll(()=>{
    vi.clearAllMocks()
  })
  afterEach(()=>{
    spy_fetch.mockClear()
  })

  it("create_userメソッドが正しく動作するかチェック", async() => {
    await create_user({user:{name:"TestUser",
                            email:"testuser@example.com",
                            password:"password",
                            password_confirmation:"password"}},{})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("update_userメソッドが正しく動作するかチェック", async() => {
    await update_user({ id:1, user:{ name:"TestUser"} },{})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("get_all_userメソッドが正しく動作するかチェック", async() => {
    await get_all_user()
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("delete_userメソッドが正しく動作するかチェック", async() => {
    await delete_user({ id: 1 },{})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("post_account_activations メソッドが正しく動作するかチェック", async() => {
    await post_account_activations ({ account_activation :{
                                        email:"testuser@example.com",
                                        activation_token:"12345678",
                                    }},{})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("get_userメソッドが正しく動作するかチェック", async() => {
    await get_user({ id: 1 },{})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("get_users_historyメソッドが正しく動作するかチェック", async() => {
    await get_users_history({ id: 1 },{})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("get_users_favoriteメソッドが正しく動作するかチェック", async() => {
    await get_users_favorite({ id: 1 },{})
    expect(spy_fetch).toHaveBeenCalled()
  })
})