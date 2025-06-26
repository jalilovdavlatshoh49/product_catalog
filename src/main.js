// main.js ё main.ts

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

// Импорти файлҳои стилӣ Tailwind ва дохил кардани конфигуратсияҳои иловагӣ
import './assets/tailwind.css'

// Эҷоди аппликейшн ва истифодаи Pinia ва Router
const app = createApp(App)

app.use(createPinia())
app.use(router)

// Монт кардан ба элементи HTML бо id="app"
app.mount('#app')