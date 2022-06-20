import "vi-fetch/setup"
import { describe, it, expect,vi, afterAll,afterEach} from 'vitest'
import { mockFetch } from "vi-fetch";
import { SessionHelper } from "../../composables/SessionHelper";

export default async function SessionHelperTest(){

  //fetchメソッドをモックする。login_checkメソッド内でこれが呼ばれたら成功
  const login_check_mock = 
    mockFetch('GET',`${import.meta.env.VITE_API_ORIGIN}/login_check`)
    .withHeaders([['csrf_token', 'this is csrf_token']])
    .willResolve({
      user_id:1,user_name:"TestUser"
    })

  //UrlHelperのFetchResponseメソッドをモックする。login、logoutメソッド内でこれが呼ばれたら成功
  const spy_url = vi.fn().mockReturnValue( Promise.resolve( { data:"data" } ))
  vi.stubGlobal("UrlHelper",vi.fn().mockReturnValue( 
    { FetchResponse: spy_url }
  ))

  //このテストでチェックするやつら
  const {  login, login_check, logout } =  SessionHelper()
  
  describe("SessionHelper test", async() => {

    afterAll(()=>{
      vi.clearAllMocks()
      mockFetch.clearAll();
    })
    afterEach(()=>{
      spy_url.mockClear()
    })

    it("loginメソッドが正しく動作するかチェック", async() => {
      await login({ session:{ email:"testuser@example.com",
                              password:"password",} }, {})
      expect(spy_url).toHaveBeenCalled()
    })

    it("logoutメソッドが正しく動作するかチェック", async() => {
      await logout({})
      expect(spy_url).toHaveBeenCalled()
    })

    it("login_checkメソッドが正しく動作するかチェック", async() => {
      const { data, loginFlg,csrf_token } =await login_check()
      expect(login_check_mock).toHaveFetched();
    })
  })
}