import { createApp } from 'vue'
import App from './components/kifu.vue'

document.addEventListener('DOMContentLoaded', () => {
  console.log('this is main_vue.js')
  const selector = '#js-shogi-vue';
  if(document.querySelector(selector)){
    createApp(App, $('#js-shogi-vue').data()).mount(selector);
  }
})