import "vi-fetch/setup"
import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { mockFetch } from "vi-fetch";
import { SessionHelper } from "../../composables/SessionHelper";

describe("SessionHelper test", async() => {

  // fetchメソッドをモックする。login_checkメソッド内でこれが呼ばれたら成功
  const login_check_mock = 
  mockFetch('GET',`${import.meta.env.VITE_API_ORIGIN}/login_check`)
  .withHeaders([['csrf_token', 'this is csrf_token']])
  .willResolve({
    user_id:1,user_name:"TestUser"
  })

  // $fetchメソッドをモックする。login、logoutメソッド内でこれが呼ばれたら成功
  const spy_fetch = vi.fn().mockResolvedValue( { data:"data" })
  vi.stubGlobal("$fetch", spy_fetch)
  
  // nuxt独自のメソッドnavigateToをモックする。force_loginメソッド内でこれが呼ばれたら成功
  const spy_navigate = vi.fn()
  vi.stubGlobal("navigateTo", spy_navigate)

   //このテストでチェックするやつら
  const {  login, login_check, logout, force_login } =  SessionHelper()

  afterAll(()=>{
    vi.clearAllMocks()
    mockFetch.clearAll();
  })
  afterEach(()=>{
    spy_fetch.mockClear()
    spy_navigate.mockClear()
  })

  it("loginメソッドが正しく動作するかチェック", async() => {
    await login({ session:{ email:"testuser@example.com",
                            password:"password",} }, {})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("logoutメソッドが正しく動作するかチェック", async() => {
    await logout({})
    expect(spy_fetch).toHaveBeenCalled()
  })

  it("login_checkメソッドが正しく動作するかチェック", async() => {
    const { data, loginFlg,csrf_token } =await login_check()
    expect(login_check_mock).toHaveFetched();
  })

  describe("force_login",()=>{
    it("force_loginメソッドがログインしている時、正しく動作するかチェック", async() => {
      force_login(true)
      expect(spy_navigate).not.toHaveBeenCalled();
    })

    it("force_loginメソッドがログインしていない時、正しく動作するかチェック", async() => {
      force_login(false)
      expect(spy_navigate).toHaveBeenCalled();
    })
  })
})