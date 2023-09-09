import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { lazyPlugin} from '@/directives/index.js'
import { componentPlugin } from '@/components/index.js'
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
pinia.use(piniaPluginPersistedstate)
app.use(componentPlugin)