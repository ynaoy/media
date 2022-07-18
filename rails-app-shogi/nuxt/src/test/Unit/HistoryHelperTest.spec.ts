import { describe, it, expect,afterEach } from 'vitest'
import { HistoryHelper } from "../../composables/HistoryHelper"

describe("HistoryHelper test", async() => {

  //このテストでチェックするやつら
  const { all_day, watched_ids, display_day, display_flg, kifu_flg, get_now } = HistoryHelper()

  let today = get_now () // 今日の日付のDate型を返す

  afterEach(()=>{
    // テスト毎に変数の初期化
    all_day.clear()
    watched_ids.clear()
  })

  it("display_dayメソッドが正しく動作するかチェック", async() => {
    // 引数によって今日、昨日、その他の日付が表示されているか
    let date = today
    expect(display_day(date)).toBe("今日")

    date.setTime(date.getTime()-(60**2)*24*1000) // 時間を前日に設定。//60秒×60分×24時間×1000ミリ秒で1日前
    expect(display_day(date)).toBe("昨日")

    date.setTime(date.getTime()-(60**2)*24*1000) // さらにその前日
    expect(display_day(date)).not.toBe("今日")
    expect(display_day(date)).not.toBe("昨日")
  })

  it("display_flgメソッドが正しく動作するかチェック", async() => {
    // display_dayメソッド後、一度使った引数はfalseを返す
    expect(display_flg(today)).toBe(true)
    display_day(today)
    expect(display_flg(today)).toBe(false)
  })

  it("kifu_flgメソッドが正しく動作するかチェック", async() => {
    // 実行後watched_idsに値が追加されている。一度使った引数ではfalseを返す
    expect(watched_ids.size).toBe(0)
    expect(kifu_flg(1)).toBe(true)
    expect(watched_ids.size).toBe(1)
    expect(kifu_flg(1)).toBe(false)
  })
})