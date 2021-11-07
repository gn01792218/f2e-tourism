import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/css/app.css'

enum City {
    Taipei ="Taipei",
    NewTaipei = "NewTaipei",
    Taoyuan = "Taoyuan",
    Taichung = "Taichung",
    Tainan = "Tainan",
    Kaohsiung = "Kaohsiung",
    Keelung = "Keelung",
    Hsinchu = "Hsinchu",
    HsinchuCounty = "HsinchuCounty",
    MiaoliCounty = "MiaoliCounty",
    ChanghuaCounty = "ChanghuaCounty",
    NantouCounty = "NantouCounty",
    YunlinCounty = "YunlinCounty",
    ChiayiCounty ="ChiayiCounty",
    Chiayi = "Chiayi",
    PingtungCounty = "PingtungCounty",
    YilanCounty = "YilanCounty",
    HualienCounty = "HualienCounty",
    TaitungCounty ="TaitungCounty",
    KinmenCounty ="KinmenCounty",
    PenghuCounty = "PenghuCounty",
    LienchiangCounty ="LienchiangCounty",
}

createApp(App).use(store).use(router).mount('#app')
