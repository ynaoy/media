import { Ref } from "@vue/runtime-dom"

export class BaseValidationClass {
  //--プロパティ--
  protected validation = ref("")

  //--メソッド--
  get = ()=>{ return this.validation.value }

  set = (new_validation:string)=>{ this.validation.value = new_validation }

  reset = ()=>{ this.validation.value = "" }
}