<template>
  <HomeIndex :kifu_data="kifu_data" :kifus="kifus" :tags="tags"
    @update_tag = "update_tag"></HomeIndex>
</template>

<script setup>

  // 使うメソッドをヘルパーからもらう
  const { get_all_tag } = TagHelper()
  const { get_kifus, get_random_one } = KifuHelper()

  //すべてのタグを呼び出す
  const tags = await get_all_tag()
  tags.unshift("全て")

  //--このコンポーネントで初期化する変数たち--
  const tag = ref("全て")
  const kifu_data  = ref({})
  const kifus  = ref({})

  //--子コーポネントに流すやつら--
  provide('tag',tag)

  //--このコンポーネントで使うメソッド達--
  const update_tag = (new_tag)=>{
    tag.value = new_tag
  }

  //apiと通信して画面に表示するデータを貰うメソッド
  const get_data_from_api = async(tag)=>{
    console.log(tag)
    return Promise.all([  get_random_one({ tag: tag }),
                          get_kifus({ tag: tag })
                      ])
  }

  //apiと通信して表示する棋譜データと100件の棋譜データを貰う
  await get_data_from_api(tag.value)
        .then((res) => {
          kifu_data.value = res[0].kifu_data
          kifus.value = res[1].kifus
          console.log(kifu_data.value)
          console.log(kifus.value)
        })

  watch(tag,async()=>{
    //apiと通信して画面に表示するデータを更新する
    await get_data_from_api(tag.value)
          .then((res) => {
            kifu_data.value = res[0].kifu_data
            kifus.value = res[1].kifus
            console.log(kifu_data.value)
            console.log(kifus.value)
          })
    nextTick()
  })

  defineExpose( { kifu_data, kifus, tag, update_tag, get_data_from_api } )

</script>