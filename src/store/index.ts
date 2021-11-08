import { createStore } from 'vuex'
import Scene from './Scene'
import Hotel from './Hotel'
import Food from './Food'
import Activity from './Activity'
import { CardCategory, City } from '@/types/enum'
export default createStore({
  state: {
    loading:false, //掌管資料loading
    currentCategory:CardCategory, //掌管使用者切換到了哪個種類
    currentCity:City[0],
  },
  mutations: {
    isloading(state:any){  
      state.loading = true
    },
    loaded(state:any){
      state.loading = false
    },
    switchCategory(state:any,CardCategory:CardCategory){
      state.currentCategory = CardCategory
    },
    switchCity(state:any,city=City.Taiwan){
      state.currentCity = city
    }
  },
  actions: {
  },
  modules: {
    Scene,Hotel,Food,Activity,
  }
})
