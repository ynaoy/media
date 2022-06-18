import { defineNuxtConfig } from 'nuxt'
//import BootstrapVue3 from 'bootstrap-vue-3'

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
