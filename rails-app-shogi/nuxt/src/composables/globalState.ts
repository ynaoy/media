import type{ Ref } from 'vue'

export const globalState = () => {
  const loginFlg: Ref<boolean> = useState('loginFlg', ()=>false)
  return { loginFlg }
}