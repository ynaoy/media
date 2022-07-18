import { reactive } from 'vue'

export const PaginationObject = (items, parPage=20)=>{

  //リアクティブな変数群
  const currentPage = ref(1)

  //メソッド群

  // currentPageを更新する
  const set_pageNum = (event)=>{
    currentPage.value = event
  }

  // paginateされたデータを返す
  const get_items = computed(()=>{
    let current = currentPage.value * parPage
    let start = current - parPage
    return items.slice(start, current)
  })

  return { 'currentPage': currentPage,
            'set_pageNum': set_pageNum,
            'get_items': get_items, }
}