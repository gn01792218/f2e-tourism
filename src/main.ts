import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/css/app.css'
// import Carousel3d from 'vue-carousel-3d';


createApp(App).use(store).use(router).mount('#app')
