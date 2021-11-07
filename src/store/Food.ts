import {getAllRestaurant,getRestaurantByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    allFood:{},
    foodByCity:{},
  };
  export const actions = {}
  
  export const mutations = {
    loadAllFood(state:any) { //接收wbSocket的訊息
      if(JSON.stringify(state.allFood)== '{}'){
        console.log("執行餐飲")
        store.commit('isloading')
        getAllRestaurant()?.then(res=>{
            state.allFood = res.data
            store.commit('loaded')
        })
     }
    },
    loadFoodByCity(state:any,cityName:City) {
      if(!state.foodByCity[cityName]){
        store.commit('isloading')
        console.log("尋找城市餐飲",cityName)
        getRestaurantByCity(cityName)?.then(res=>{
          state.foodByCity[cityName] = res.data
          store.commit('loaded')
          console.log(state.foodByCity)
        })
      }
    }
  };
  export const getters = {
   
  }
  
  export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
  };