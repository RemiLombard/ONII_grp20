import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import V3ScrollLock from 'v3-scroll-lock'

const app = createApp(App)

app.use(router)
app.use(V3ScrollLock,{})
app.mount('#app')
