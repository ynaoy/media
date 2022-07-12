import { defineNuxtConfig } from 'nuxt'

// テスト環境でAPIのオリジンが設定されていなければ適当に設定
if(import.meta.env.VITE_API_ORIGIN == undefined){
  import.meta.env.VITE_API_ORIGIN = " "
}
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr:false,
  target:"server",
  css: [
    'bootstrap-vue-3/dist/bootstrap-vue-3.css',
    '@/assets/scss/app.scss',
    '@/assets/scss/custom.scss'
  ],
})
