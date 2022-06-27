import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { UserHelper } from "../../composables/UserHelper";

describe("UserHelper test", async() => {

  //UrlHelperのFetchResponsメソッドをモックする。テストメソッド内でこれが呼ばれたら成功
  const spy = vi.fn().mockReturnValue( Promise.resolve( { data:"data" } ))
  vi.stubGlobal("UrlHelper",vi.fn().mockReturnValue( 
    { FetchResponse: spy }
  ))
  //このテストでチェックするやつら
  const { create_user, update_user } = UserHelper()

  afterAll(()=>{
    vi.clearAllMocks()
  })
  afterEach(()=>{
    spy.mockClear()
  })

  it("create_userメソッドが正しく動作するかチェック", async() => {
    await create_user({user:{name:"TestUser",
                            email:"testuser@example.com",
                            password:"password",
                            password_confirmation:"password"}},{})
    expect(spy).toHaveBeenCalled()
  })

  it("update_userメソッドが正しく動作するかチェック", async() => {
    await update_user({id:1, user:{ name:"TestUser"} },{})
    expect(spy).toHaveBeenCalled()
  })
})