import { vi } from 'vitest'
import NavBarTest from './Unit/NavBarTest'
import SideNavigationTest from './Unit/SideNavigationTest'
import LoginFormTest from './Unit/LoginFormTest'
import SignupFormTest from './Unit/SignupFormTest'
import ProfileFormTest from './Unit/ProfileFormTest'

//コンポーネント内で使われるが、テスト中には使えないメソッドを疑似的に使えるようにする。
const login_check = vi.fn().mockReturnValue( {  'data':{user_id:"1",user_name:"TestUser"},
                                                'loginFlg':true,
                                                'csrf_token':"this is csrf token"})
vi.stubGlobal("SessionHelper",vi.fn().mockReturnValue({ "login": vi.fn(),
                                                        "login_check":login_check })
)
vi.stubGlobal("UserHelper",vi.fn().mockReturnValue({ "create_user":vi.fn(),
                                                      "update_user":vi.fn() })
)
vi.stubGlobal("inject",vi.fn())

await NavBarTest()
await SideNavigationTest()
await LoginFormTest()
await SignupFormTest()
await ProfileFormTest()