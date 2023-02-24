import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { appAxios } from './utils/appAxios.js'

import App from './App.vue'
// import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.provide("appAxios", appAxios)
// app.use(router)

app.mount('#app')
