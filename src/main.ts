import '@/modules/webfontloader'
import '@/modules/pinia'
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { piniaInstance } from '@/modules/pinia'

const app = createApp(App)

app.use(piniaInstance)
app.use(router)

app.mount('#app')

if (import.meta.env.DEV) {
  document.addEventListener(
    'click',
    () => {
      import('./dev').then((data) => {
        //@ts-ignore
        window.dev = data?.default ?? data
      })
    },
    {
      once: true
    }
  )
}
