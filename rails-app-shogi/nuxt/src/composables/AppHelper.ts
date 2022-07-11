export const AppHelper = ()=>{
  // 引数が空かどうか判定
  const check_is_empty = (items:object[])=>{
    return (items != undefined) && (items.length != 0) 
  }

  return { "check_is_empty": check_is_empty, }
}