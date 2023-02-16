<template>
  <div>
    <b-dropdown :text="text" variant="light" menu-class="dropdown-menu-light" >
      <b-dropdown-item-button  v-for="(value,key) in items" :key="key" 
        @click.prevent="click_callback(value)">
        {{ value }}
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script lang ="ts" setup>

  // 親コンポーネントから貰う奴ら。
  const props = defineProps<{
    text: string, items: Array<string>, click_callback<T>(value:T): any
  }>()

  const { text, items, click_callback } = toRefs(props)

  // このコンポーネントでのコンストラクタ
  if(click_callback.value==null) click_callback.value= (value)=>{}

  defineExpose( { text, items, click_callback} )
</script>

<style lang="scss" scoped>
</style>