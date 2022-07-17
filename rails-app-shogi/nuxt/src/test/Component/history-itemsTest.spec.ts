import { describe, it, expect,vi,afterAll, afterEach } from 'vitest'
import { MountHelper,TestHelper } from "../TestHelper"
import HistoryItems from "../../components/users/history-items.vue"

describe("history-items test", async() => {

  //テストヘルパーの呼び出しとコンポーネントのマウント
  const test_num = 60
  const { Mount } = MountHelper()
  const { hist_data, set_date,timewithzone_to_str } = TestHelper("")
  const wrapper = Mount( HistoryItems,  { user_id: 1, csrf_token:"this is csrf_token" },
                                        { items: hist_data(test_num)}) 
  
  it("v-forが正しく機能して子コンポーネントの表示件数をチェック", () => {
    // 重複分を除いた全データの半分が表示される
    expect(wrapper.html().match(new RegExp("<kifu-url",'g')).length).toBe(test_num/2)
  })

  it("テキストが正しく表示されているかチェック", () => {
    let date = set_date()
    // 時間を二日前に設定に設定。60秒×60分×24時間×1000ミリ秒×2日
    date.setTime(date.getTime()-(60**2)*24*1000*2) 

    expect(wrapper.text()).toContain("今日")
    expect(wrapper.text()).toContain("昨日")
    for (let i=0; i < (test_num/2-2) ; i++){
      expect(wrapper.text()).toContain(timewithzone_to_str(date))
      // 1日前に設定
      date = new Date(date.getTime()-(60**2)*24*1000)
    }
  })
})