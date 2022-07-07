export const TagHelper = () => {
  // ------------------------------------------------------
  // タグの順番を変えない。順番が変わるとDBと整合性が取れなくなる
  // ------------------------------------------------------
  const get_all_tag = async()=> {
    const   tags = ["相居飛車","相振り飛車","対抗系"],
            tag_1 = ["角換わり","相掛かり","雁木","矢倉"],
            tag_2 = ["棒銀","早繰り銀","腰掛銀"],
            another_tag = ["横歩取り","右玉","筋違い角","嬉野流","アヒル戦法",
                          "対振り急戦","対振り持久戦","向かい飛車","三間飛車","石田流三間飛車","四間飛車","中飛車",
                          "角交換向かい飛車","角交換三間飛車","角交換四間飛車","角交換中飛車",]

    // tag_2を配列に追加
    for (let n in tag_2){
      tags.push(tag_2[n])
    } 
    // tag_1[i]+tag_2[j]を全探索して配列に追加する。ついでにtag_1を配列に追加する
    for (let i in tag_1){
      tags.push(tag_1[i])
      for (let j in tag_2){
        tags.push(tag_1[i]+tag_2[j])
      }
    }
    // 残りのネストしてないタグを追加
    for (let n in another_tag){
      tags.push(another_tag[n])
    }
    return tags
  }
  return { "get_all_tag": get_all_tag, }
}