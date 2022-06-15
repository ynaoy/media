<template>
  <div class="list-group list-group-flush">
    <nuxt-link v-if="loginFlg" to="/" :class="class_name">
      マイページ
    </nuxt-link>

    <nuxt-link v-if="loginFlg" to="/" :class="class_name">
      お気に入り
    </nuxt-link>
    
    <nuxt-link v-if="loginFlg" to="/" :class="class_name">
      棋譜を追加
    </nuxt-link>
    
    <nuxt-link v-if="loginFlg" to="/" :class="class_name">
      閲覧履歴
    </nuxt-link>

    <div :class="class_name">
      好みの棋譜を探す
      <div id="tags">
        <nuxt-link v-for="(tag,key) in tags" :key="key" to="/" id="tag">
          {{ tag }}
        </nuxt-link>
      </div>
    </div>

  </div>
</template>

<script setup>

  //親コンポーネントから貰う奴ら
  const loginFlg = ref(inject('loginFlg'))

  const tags = ["相掛かり","矢倉","角換わり","横歩取り","三間飛車","四間飛車","角交換四間飛車","角交換中飛車"]
  let class_name = "list-group-item list-group-item-action list-group-item-secondary"
  
</script>

<style scoped>
</style>
