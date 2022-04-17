import { createApp } from 'vue'
import App from './components/hello.vue'

document.addEventListener('DOMContentLoaded', () => {
  console.log('this is hello_vue.js')
  const selector = '#js-hello-vue';
  if(document.querySelector(selector)){
    createApp(App).mount(selector);
  }
})