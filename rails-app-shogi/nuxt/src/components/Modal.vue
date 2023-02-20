<template>
  <div>
    <button v-if="is_test" type="button" class="btn btn-primary" 
            @click= "reactive_model= !reactive_model" >
        demo modal
    </button>

    <b-modal  v-bind ="bModalProps"
              v-model ="reactive_model"
              @shown = "shown_fnc"
              @hidden ="hidden_fnc">

      <template v-slot:title>
        <slot name="title"> </slot>
      </template>

      <slot name="content"></slot>

      <template v-slot:footer>
        <slot name="footer"> </slot>
      </template>
        
    </b-modal>
  </div>
</template>

<script lang="ts" setup>
  import { Ref } from 'vue' 
  //親コンポーネントから貰う奴ら。
  const bModalProps = defineProps({ centered: { type:Boolean, default:false} ,
                                    hideHeaderClose: { type:Boolean, default:false },
                                    noCloseOnBackdrop: { type:Boolean, default:false },
                                    noCloseOnEsc: { type:Boolean, default:false },
                                    id: { type:String, default: "" },
                                    ariaLabelledby: { type:String, default: "" },
                                  })
  
  const is_test: boolean          = inject('is_test')
  const reactive_model: Ref<any>  = inject('reactive_model')
  const shown_fnc: ()=>void       = inject('shown_fnc')
  const hidden_fnc: ()=>void      = inject('hidden_fnc')

  defineExpose( { bModalProps } )
</script>

<style scoped>
</style>