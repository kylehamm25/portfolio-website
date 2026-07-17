import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import interact from 'interactjs'

const app = createApp(App)
app.use(router)
app.use(interact)

app.mount('#app')
