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

  // sessionStrageをモックする。store_location, redirect_back_or_homeメソッド内で呼び出されたら成功
  const spy_sess_setItem =    vi.spyOn(sessionStorage.__proto__,'setItem')
  const spy_sess_getItem =    vi.spyOn(sessionStorage.__proto__,'getItem')
  const spy_sess_removeItem = vi.spyOn(sessionStorage.__proto__,'removeItem')

   //このテストでチェックするやつら
  const { login, login_check, logout, force_login, store_location, redirect_back_or_home }= SessionHelper()

  afterAll(()=>{
    vi.clearAllMocks()
    mockFetch.clearAll();
  })
  afterEach(()=>{
    spy_fetch.mockClear()
    spy_navigate.mockClear()
    spy_sess_setItem.mockClear()
    spy_sess_getItem.mockClear()
    spy_sess_removeItem.mockClear()
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

  it("store_locationメソッドが正しく動作するかチェック", async() => {
    await store_location()
    expect(spy_sess_setItem).toHaveBeenCalled()
  })

  it("redirect_back_or_homeメソッドが正しく動作するかチェック", async() => {
    redirect_back_or_home()
    expect(spy_sess_getItem).toHaveBeenCalled()
    expect(spy_sess_removeItem).toHaveBeenCalled()
  })
})