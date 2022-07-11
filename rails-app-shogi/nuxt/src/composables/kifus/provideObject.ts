import { provide } from 'vue'

export const  provideObject = (params)=>{

  //paramsのkeyとvalueでprovideして子コンポーネントに渡す
  for (let key in params){
    provide(key, params[key])
  }

}