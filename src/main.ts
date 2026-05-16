import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

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

app.mount('#app')
