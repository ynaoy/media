import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr:false,
  target:"server",
  css: [
    '@/assets/scss/app.scss',
    '@/assets/scss/custom.scss'
  ],

  modules: [
    //'@nuxtjs/axios',
    //'@nuxtjs/auth',
    //'bootstrap-vue/nuxt', { css: false,bvCSS: false }
  ],

  //axios: {
    //baseURL: "http://localhost:3000/",
    //browserBaseURL: "http://localhost:3001/",
    //proxyHeaders: false,
    //credentials: true
  //},

  //auth: {
  //  redirect: {
  //    login: '/login',   // 未ログイン時に認証が必要なページにアクセスした際のリダイレクトURL
  //    logout: '/',  // ログアウト時のリダイレクトURL
  //    callback: '/callback',   // Oauth認証等で必要となる コールバックルート
  //    home: '/',         // ログイン後のリダイレクトURL
  //  },
  //  strategies: {
  //    local: {
  //      endpoints: {
  //        login: { url: '/login', method: 'post', propertyName: 'jwt' },
  //       user: false,
  //        logout: false
  //      }
  //    },
  //  }
  //},

  //router: {
  //  middleware: ['auth']
  //},

  //vite: {
  //  optimizeDeps: {
      //include:['vue','axios'],
  //    exclude: [
        //'axios',
        //'vue',
        //'chunk-RMAWELCF',
        //'defu',
  //    ]
  //  }
  //}
})
