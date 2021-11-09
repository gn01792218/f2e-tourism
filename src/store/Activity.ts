import {getAllActivity,getActivityByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
  hotActivity:{},
  allActivity:{},
  activityByCity:{},
};
  export const actions = {
    getAllActivity(context:any){
      console.log("判斷是否請求")
      if(JSON.stringify(state.allActivity)== '{}'){
        store.commit('isloading')
        getAllActivity()?.then(res=>{
        console.log("1.請求資料")
        context.commit('loadAllActivity',res.data)
        store.commit('loaded')
      })
      }
    }
  }
  
  export const mutations = {
    loadHotActivity(state:any){
      if(JSON.stringify(state.hotActivity)== '{}'){
        // console.log("熱門活動")
        getAllActivity(4)?.then(res=>{
            state.hotActivity = res.data
            // console.log('hotActivity',state.hotActivity)
        })
     }
    },
    // loadAllActivity(state:any) {
    //   if(JSON.stringify(state.allActivity)== '{}'){
    //      store.commit('isloading')
    //      getAllActivity()?.then(res=>{
    //          state.allActivity = res.data
    //          store.commit('loaded')
    //      })
    //   }
    //  },
     loadAllActivity(state:any,payload:any) {
       console.log("2.裝資料")
      state.allActivity = payload
     },
     loadActivityByCity(state:any,cityName:City) {
      if(!state.activityByCity[cityName]){
        store.commit('isloading')
        console.log("尋找城市活動",cityName)
        getActivityByCity(cityName)?.then(res=>{
          state.activityByCity[cityName] = res.data
          store.commit('loaded')
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