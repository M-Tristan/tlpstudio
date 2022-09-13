import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import elementuse from './common/elementuse'
import { useElement } from './components/element'

const app = createApp(App)
elementuse(app)
useElement(app)
app.mount('#app')
