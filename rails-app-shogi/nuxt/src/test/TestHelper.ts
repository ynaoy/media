import { expect } from 'vitest'
import { mount,shallowMount } from "@vue/test-utils"

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

export const TestHelper = (wrapper) =>{

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

  //APIからもらう適当なkifu_dataを返す
  const kifu_data = ()=>{
    return { 
      kifu_id: 1,
      favorite_flg: false,
      player1:"player1",
      player2:"player2",
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

  //APIからもらう適当なkifu_dataを返す
  const kifus_data = (num=60)=>{
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

  //APIからもらう適当なuser_dataを返す
  const users_data = (num=60)=>{
    let users = []
    for (let i=0; i<num; i++){
      users.push({
        id: i,
        name: `user_${i}` })
    }
    return users
  }

  // 日本時間で現在時刻を貰う
  const set_date = ()=>{
    let date = new Date()
    // 日本時間jstに変換
    date.setTime(date.getTime()+1000*60*60*9)
    return date
  }

  return {  check_text: check_text, 
            check_form: check_form, 
            set_form: set_form,
            kifu_data: kifu_data,
            kifus_data: kifus_data,
            users_data: users_data,
            set_date: set_date}

}