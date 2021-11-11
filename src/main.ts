import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/css/app.css'

createApp(App).use(store).use(router).use(VCalendar,{}).mount('#app')
