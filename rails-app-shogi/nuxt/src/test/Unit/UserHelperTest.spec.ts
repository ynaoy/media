import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { UserHelper } from "../../composables/UserHelper";

describe("UserHelper test", async() => {

  // $fetchメソッドをモックする。APIと通信するメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)
    
  //このテストでチェックするやつら
  const { create_user, update_user, get_all_user, delete_user, get_user, get_users_history } = UserHelper()

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

  it("get_userメソッドが正しく動作するかチェック", async() => {
    await get_user({ id: 1 },{})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("get_users_historyメソッドが正しく動作するかチェック", async() => {
    await get_users_history({ id: 1 },{})
    expect(spy_fetch).toHaveBeenCalled()
  })
})