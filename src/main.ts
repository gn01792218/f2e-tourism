import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/css/app.css'
import L from 'leaflet';
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'

createApp(App).use(store).use(router).use(VCalendar,{}).use(OpenLayersMap).mount('#app')
