import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

if (import.meta.env.DEV) {
  import('./dev').then((data) => {
    //@ts-ignore
    window.dev = data?.default ?? data
  })
}
