import {getAllActivity,getActivityByCity} from '../api'
export const state = {
  allActivity:{},
  activityByCity:{},
};
  export const actions = {}
  
  export const mutations = {
    loadAllActivity(state:any) { //接收wbSocket的訊息
      if(JSON.stringify(state.allActivity)== '{}'){
         console.log("執行活動")
         getAllActivity()?.then(res=>{
             state.allActivity = res.data
         })
      }
     },
     loadActivityByCity(state:any,cityName:City) {
      if(!state.activityByCity[cityName]){
        console.log("尋找城市景點",cityName)
        getActivityByCity(cityName)?.then(res=>{
          state.activityByCity[cityName] = res.data
          console.log(state.activityByCity)
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