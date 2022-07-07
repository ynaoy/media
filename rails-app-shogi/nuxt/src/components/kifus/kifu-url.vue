<template>
  <div class="kifu">
    <nuxt-link :to= "'/kifus/'+kifu.id">
      <p class="kifuUrl">
        <span v-if="kifu.title != ''">
          {{ kifu.title }}
        </span>
        <span v-else >
          先手：
          <span :id="win_or_lose(1,kifu)" >
            {{ kifu.player1 }}
          </span>
          <span id="vs"> VS </span>
          後手：
          <span :id="win_or_lose(2,kifu)" >
            {{ kifu.player2 }}
          </span>
        </span>
        <span id ="created" >
          {{ timewithzone_to_str(kifu.created_at) }}
        </span>
      </p>
    </nuxt-link>
    <nuxt-link v-if="user_id == kifu.user_id" to="/kifus" id="deleteUrl">
      <p>
        <span id="delete"> delete </span>
      </p>
    </nuxt-link>
  </div>
</template>

<script setup>

  // 親コンポーネントから貰う奴ら。
  const user_id = inject('user_id')
  const { kifu } = defineProps(['kifu'])

  // このコンポーネントで使うメソッド
  const win_or_lose =   (win,kifu)=>{
    if(win == kifu.win) return "win"
  }

  // JST(UTCの日本版)形式の時刻データを、yyyy年MM月dd日hh時mm分に成形する
  const timewithzone_to_str = (time)=>{
    time = new Date(time)
    let year = time.getFullYear(), month = time.getMonth()+1, date = time.getDate()
    let hour = time.getHours(), minute = time.getMinutes()
    return `${year}年${month}月${date}日${hour}時${minute}分`
  }
  
  defineExpose( { kifu, win_or_lose, timewithzone_to_str } )

</script>

<style scoped>
</style>