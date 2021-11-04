import {getAllRestaurant,getRestaurantByCity} from '../api'
export const state = {
    allFood:{}
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