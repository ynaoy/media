import { provide } from 'vue'

export const  provideObject = (params:{[key:string]:any})=>{
  
  //paramsのkeyとvalueでprovideして子コンポーネントに渡す
  Object.keys(params).forEach((key)=> provide(key,params[key]))
}