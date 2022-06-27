import { expect } from 'vitest'

export const TestHelper = (wrapper) =>{

  //wrapperにテキストが含まれているかチェックする
  const check_text = async (texts)=>{
    const html = wrapper.html()
    for (let i in texts){
      expect(html).toContain(texts[i])
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
  return { check_text:check_text, check_form:check_form, set_form:set_form }

}