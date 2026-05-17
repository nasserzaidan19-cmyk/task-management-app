import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './lib/queryClient'
import { router } from './router'

const REQUIRED_ENV_VARS = ['VITE_API_URL'] as const

for (const key of REQUIRED_ENV_VARS) {
  if (!import.meta.env[key]) {
    throw new Error(
      ` Missing required environment variable: ${key}\n` +
        `Ensure you have a .env file with this variable defined.`
    )
  }
}

const app = createApp(App)
app.use(router)

app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
