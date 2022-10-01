import { expect,vi } from 'vitest'
import { mount,shallowMount } from "@vue/test-utils"
import { AppHelper } from '../composables/AppHelper'
export const MountHelper = () =>{
  //shallowMountをラップする
  const Mount = (component, provide = {}, props = {}, shallow = true) =>{
    const wrapper = mount(component, { 
      global:{ provide: provide },
      propsData: props,
      shallow:shallow
    })
    return wrapper
  }

  return {  Mount: Mount }
}

export const TestHelper = (wrapper="") =>{
  // 使うメソッドをヘルパーからもらう
  const { timewithzone_to_str } = AppHelper()

  //wrapperにテキストが含まれているかチェックする
  const check_text = async (texts)=>{
    const text = wrapper.text()
    for (let i in texts){
      expect(text).toContain(texts[i])
    }
  }

  //wrapperにフォームが存在するかチェック
  const check_form = async (forms)=>{
    for (let i in forms){
      expect(wrapper.find(forms[i]).exists()).toBeTruthy()
    }
  }

  //wrapperにフォームの値を入力する
  const set_form = async (forms, values)=>{
    for (let i in values){
      wrapper.find(forms[i]).setValue(values[i])
    }
  }

  //APIからもらう適当な棋譜のデータを返す
  const kifu_data = ()=>{
    return { 
      kifu_id: 1,
      favorite_flg: false,
      player1:"player1",
      player2:"player2",
      tags: JSON.stringify([{ name:"角換わり" }, { name:"相掛かり" }]),
      kifu_text:  [
        [["香","桂","銀","金","王","金","銀","桂","香"],
        ["","飛","","","","","","角",""],
        ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["歩","歩","歩","歩","歩","歩","歩","歩","歩"],
        ["","角","","","","","","飛",""],
        ["香","桂","銀","金","王","金","銀","桂","香"]],

        [["香","桂","銀","金","王","金","銀","桂","香"],
        ["","飛","","","","","","角",""],
        ["歩","歩","歩","歩","歩","歩","歩","歩",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","歩","","","","","",""],
        ["歩","歩","","歩","歩","歩","歩","歩","歩"],
        ["","角","","","","","","飛",""],
        ["香","桂","銀","金","王","金","銀","桂","香"]],
        ],

      kifu_flg: [
        [[2,2,2,2,2,2,2,2,2],
        [0,2,0,0,0,0,0,2,0],
        [2,2,2,2,2,2,2,2,2],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1],
        [0,1,0,0,0,0,0,1,0],
        [1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0] ],

        [[2,2,2,2,2,2,2,2,2],
        [0,2,0,0,0,0,0,2,0],
        [2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0],
        [1,1,0,1,1,1,1,1,1],
        [0,1,0,0,0,0,0,1,0],
        [1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,1,0],
        [0,0,0,0,0,0,0,0] ],
    ]}
  }

  //APIからもらう適当な棋譜の集まりのデータを返す
  const kifus_data = (num=60,)=>{
    let kifus = []
    for (let i=0; i<num; i++){
      kifus.push({
        id: i,
        user_id: (i%2==0)? 1 :2,
        title: "",
        win: (i%2==0)? 1 :2,
        created_at: set_date(),
        player1:"player1",
        player2:"player2",})
    }
    return kifus
  }

  //APIからもらう適当な閲覧履歴のデータを返す
  const hist_data = (num=60)=>{
    let hist = kifus_data(num),date = set_date()

    for (let i=0; i<num; i++){
      hist[i].watch_at = date
      if(i%2 ==1){ 
        hist[i].id -= 1 // テスト用にidを重複させる。
         //60秒×60分×24時間×1000ミリ秒で1日前
        date = new Date(date.getTime()-(60**2)*24*1000)
      } 
    }
    return hist
  }

  //APIからもらう適当なユーザーのデータを返す
  const users_data = (num=60)=>{
    let users = []
    for (let i=0; i<num; i++){
      users.push({
        id: i,
        name: `user_${i}` })
    }
    return users
  }

  //APIからもらう適当なユーザーのデータとそのユーザーの棋譜を返す
  const user_and_kifus = (user_id = 1,
                          user_name = "TestUser",
                          num = 60 )=>{
    let user = {id: user_id, name: user_name}
    let kifus = kifus_data(num)
    return {  user: JSON.stringify(user),
              kifus: JSON.stringify(kifus)}
  }

  //APIからもらう適当なユーザーと棋譜の集まりを返す
  const users_and_kifus = ( user_num = 60, kifu_num = 60,user_name = "" )=>{
    let users = users_data( user_num )
    let kifus = kifus_data( kifu_num )
    return {  users: JSON.stringify(users),
              kifus: JSON.stringify(kifus) }
  }

  // 日本時間で現在時刻を貰う
  const set_date = ()=>{
    let date = new Date()
    // 日本時間jstに変換
    date.setTime(date.getTime()+1000*60*60*9)
    return date
  }

  // 関数をモックして呼び出されたか確認用のスパイを返す
  const mock_func = ( name, res={}, isresolve=false ) =>{
    let spy = vi.fn()

    // resの要素数が0でないならモックした関数呼び出し時にresを返す
    if(Object.keys(res).length != 0){

      if(isresolve){
        spy = spy.mockResolvedValue(res)
      }
      else{
        spy = spy.mockReturnValue(res)
      }
    }

    vi.stubGlobal(name,spy)
    return spy
  }

  return {  check_text: check_text, 
            check_form: check_form, 
            set_form: set_form,
            kifu_data: kifu_data,
            kifus_data: kifus_data,
            users_data: users_data,
            user_and_kifus: user_and_kifus,
            users_and_kifus: users_and_kifus,
            hist_data: hist_data,
            set_date: set_date,
            timewithzone_to_str: timewithzone_to_str,
            mock_func: mock_func}

}