import {getAllActivity,getActivityByCity} from '../api'
export const state = {
  allActivity:{},
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