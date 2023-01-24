export const ValidationHelper = () =>{
  //--メンバ変数--
  const validation = ref("")

  //--メソッド--
  const get_validation = ()=>{ return validation.value }

  const set_validation = (new_validation:string)=>{ validation.value = new_validation }

  const reset_validation = ()=>{ validation.value = "" }

  return {  get_validation: get_validation,
            set_validation: set_validation,
            reset_validation: reset_validation,
          }
}