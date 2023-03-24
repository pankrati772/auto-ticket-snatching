import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


(window as any).electronAPI.setTitle('132')
console.log(window, 'window')

createApp(App).mount('#app')
