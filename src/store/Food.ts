import {getAllRestaurant,getRestaurantByCity} from '../api'
export const state = {
    allFood:{},
    foodByCity:{},
  };
  export const actions = {}
  
  export const mutations = {
    loadAllFood(state:any) { //接收wbSocket的訊息
      if(JSON.stringify(state.allFood)== '{}'){
        console.log("執行餐飲")
        getAllRestaurant()?.then(res=>{
            state.allFood = res.data
        })
     }
    },
    loadFoodByCity(state:any,cityName:City) {
      if(!state.foodByCity[cityName]){
        console.log("尋找城市旅宿",cityName)
        getRestaurantByCity(cityName)?.then(res=>{
          state.foodByCity[cityName] = res.data
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