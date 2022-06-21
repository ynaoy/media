import { vi } from 'vitest'
import NavBarTest from './Component/NavBarTest'
import SideNavigationTest from './Component/SideNavigationTest'
import LoginFormTest from './Component/LoginFormTest'
import SignupFormTest from './Component/SignupFormTest'
import ProfileFormTest from './Component/ProfileFormTest'
import KifuShowTest from './Component/KifuShowTest'

import UrlHelperTest from './Unit/UrlHelperTest'
import UserHelperTest from './Unit/UserHelperTest'
import SessionHelperTest from './Unit/SessionHelperTest'
import KifuHelperTest from './Unit/KifuHelperTest'

//コンポーネント内で使われるが、テスト中には使えないメソッドを疑似的に使えるようにする。
const login_check = vi.fn().mockReturnValue( {  'data':{user_id:"1",user_name:"TestUser"},
                                                'loginFlg':true,
                                                'csrf_token':"this is csrf token"})
vi.stubGlobal("SessionHelper",vi.fn().mockReturnValue({ "login_check":login_check }))

await NavBarTest()
await SideNavigationTest()
await LoginFormTest()
await SignupFormTest()
await ProfileFormTest()
await KifuShowTest()

await UrlHelperTest()
await UserHelperTest()
await SessionHelperTest()
//await KifuHelperTest()