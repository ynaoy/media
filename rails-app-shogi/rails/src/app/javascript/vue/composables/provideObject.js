import { provide } from 'vue'

export default function provideObject(params){

  //paramsのkeyとvalueでprovideして子コンポーネントに渡す
  for (let key in params){
    provide(key, params[key])
  }

}