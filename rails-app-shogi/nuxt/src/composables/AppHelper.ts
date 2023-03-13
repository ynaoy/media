export const AppHelper = ()=>{
  // 引数が空かどうか判定
  const check_is_empty = (items: any[]|{}):boolean=>{
    return (items != undefined) && (Object.keys(items).length != 0) 
  }

  // JST(UTCの日本版)形式の時刻データを、yyyy年MM月dd日hh時mm分に成形する
  const timewithzone_to_str = (datetime:string, with_time=false):string=>{
    datetime = new Date(datetime)
    let year = datetime.getFullYear(), month = datetime.getMonth()+1, date = datetime.getDate()
    let hour = datetime.getHours(), minute = datetime.getMinutes()
    let res = `${year}年${month}月${date}日`

    if(with_time){
      res += `${hour}時${minute}分`
    }
    return res
  }

  return {  "check_is_empty": check_is_empty,
            "timewithzone_to_str":timewithzone_to_str}
}