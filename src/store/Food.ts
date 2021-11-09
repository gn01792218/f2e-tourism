import {getAllRestaurant,getRestaurantByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    hotFood:{},
    allFood:{},
    foodByCity:{},
  };
  export const actions = {
    getAllFood(context:any){
      console.log("判斷是否請求")
      if(JSON.stringify(state.allFood)== '{}'){
        store.commit('isloading')
        getAllRestaurant()?.then(res=>{
        console.log("1.請求資料")
        context.commit('loadAllFood',res.data)
        store.commit('loaded')
      })
      }
    }
  }
  
  export const mutations = {
    loadHotFood(state:any){
      if(JSON.stringify(state.hotFood)== '{}'){
        // console.log("熱門餐飲")
        getAllRestaurant(4)?.then(res=>{
            state.hotFood = res.data
            // console.log('hotFood',state.hotFood)
        })
     }
    },
    // loadAllFood(state:any) { 
    //   if(JSON.stringify(state.allFood)== '{}'){
    //     store.commit('isloading')
    //     getAllRestaurant()?.then(res=>{
    //         state.allFood = res.data
    //         store.commit('loaded')
    //     })
    //  }
    // },
    loadAllFood(state:any,payload:any) { 
      console.log("2.裝資料")
      state.allFood = payload
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