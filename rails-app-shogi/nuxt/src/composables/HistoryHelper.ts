import { AppHelper } from './AppHelper'

export const HistoryHelper = ()=>{

  // 使うヘルパー
  const { timewithzone_to_str } = AppHelper()

  // 管理する変数群
  const all_day = new Set(), watched_ids = new Set()
  let today

  // メソッド
  // 日付が今日か昨日なら、表示する値を変える。
  const display_day = ((day)=>{

    day = timewithzone_to_str(day)
    step_day(day) // 日付が変わった時の処理

    if(day ==  timewithzone_to_str(today)){
      return "今日"
    }
    //60秒×60分×24時間×1000ミリ秒で1日前
    else if(day == timewithzone_to_str(today.getTime()-(60**2)*24*1000)){ 
      return "昨日"
    }
    return day
  })
  
  // 表示する日付が変わった時の処理
  const step_day = (day)=>{
    all_day.add(day)    // 既に表示した日付を追加
    watched_ids.clear() // 同一日の重複した履歴を再度管理するため、日付が変わったら初期化する
  }
  
  // 日付を表示するかどうかのフラグ。重複した日付を表示させない
  const display_flg = (day)=>{
    return !all_day.has(timewithzone_to_str(day))
  }
  
  // 履歴の中身を表示するかどうかのフラグ。同一日の重複した履歴は一度しか表示させない
  const kifu_flg = (id)=>{
    if(!watched_ids.has(id)){
      watched_ids.add(id)
      return true // 表示させる
    }
    return false // 表示させない
  }
  
  // 現在の日付を返す
  const get_now = ()=>{
    let datetime = new Date()
    datetime.setTime(datetime.getTime()+1000*60*60*9) // 日本時間jstに変換
    return datetime
  }

  today = get_now()

  return {  "all_day": all_day,
            "watched_ids": watched_ids,
            "display_day": display_day,
            "display_flg": display_flg, 
            "kifu_flg": kifu_flg, 
            "get_now": get_now
          }
}