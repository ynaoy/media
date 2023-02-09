<template>
  <div v-if = "items.length > parPage">
    <paginate
      v-model= "currentPage"
      :page-count= "getPageCount(items)"
      :page-range= "3"
      :margin-pages= "2"
      :click-handler= "clickCallback"
      :hide-prev-next= "true"
      prev-text= "前へ"
      next-text= "次へ"
      container-class= "pagination"
      page-class= "page-item"
    />
  </div>

</template>

<script setup>
  // 親コンポーネントから貰う奴ら。
  const props = defineProps(['items','parPage', 'currentPage'])
  const { items, parPage, currentPage } = toRefs(props)

  const emit = defineEmits(['pageNum'])
  //このコンポーネントで使うメソッド
  const clickCallback = (pageNum)=>{
    emit('pageNum', Number(pageNum))
  }

  const getPageCount = (items)=>{
    return Math.ceil(items.length/parPage.value)
  }

  defineExpose( { items } )

</script>

<style scoped>
</style>