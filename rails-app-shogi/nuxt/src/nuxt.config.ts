//import { defineNuxtConfig } from 'nuxt'
import { defineNuxtConfig } from 'nuxt/config'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr:false,
  target:"server",
  css: [
    'bootstrap-vue-3/dist/bootstrap-vue-3.css',
    '@/assets/scss/app.scss',
    '@/assets/scss/custom.scss'
  ],
  // APIのオリジンが設定されていなければ適当に設定
  publicRuntimeConfig:{
    VITE_API_ORIGIN : process.env.VITE_API_ORIGIN || ""
  }
})
