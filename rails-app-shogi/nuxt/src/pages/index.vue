<template>
  <HomeIndex :kifu_data="kifu_data" :kifus="kifus" :tags="tags"
    @update_tag = "update_tag" @update_kifu = "get_kifu_data_from_api">
  </HomeIndex>
</template>

<script lang="ts" setup>

  // 使うメソッドをヘルパーからもらう
  const { get_all_tag } = TagHelper()
  const { get_kifus, get_random_one } = KifuHelper()

  //すべてのタグを呼び出す
  const tags: string[] = await get_all_tag()
  tags.unshift("全て")

  //--このコンポーネントで初期化する変数たち--
  const tag = ref("全て")
  const kifu_data  = ref({})
  const kifus  = ref({})

  //--子コーポネントに流すやつら--
  provide('tag',tag)

  //--このコンポーネントで使うメソッド達--

  const update_tag = (new_tag: string)=>{
    tag.value = new_tag
  }

  //apiと通信してkifu_data変数を貰うメソッド
  const get_kifu_data_from_api = async(tag:string)=>{
    await get_random_one({ tag: tag },{})
            .then((res)=>{
              kifu_data.value = res.kifu_data
              console.log(kifu_data.value)
            })
  }

  //apiと通信して画面に表示するデータを貰うメソッド
  const get_data_from_api = async(tag:string)=>{
    return Promise.all([  get_random_one({ tag: tag },{}),
                          get_kifus({ tag: tag },{})
                      ])
  }
  //------------------------------------

  // --Created--
  // apiから表示する棋譜データを貰う
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

  defineExpose( { kifu_data, kifus, tag, update_tag, get_kifu_data_from_api, get_data_from_api } )

</script>