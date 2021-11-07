import {getAllTourismData,getTourismDataByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    allScene:{},
    sceneByCity:{},  //給預設的靜態頁面使用
  };
  export const actions = {
  }
  
  export const mutations = {
    loadAllScene(state:any) { 
     if(JSON.stringify(state.allScene)== '{}'){
        console.log("執行")
        store.commit('isloading')
        getAllTourismData()?.then(res=>{
            state.allScene = res.data
            store.commit('loaded')
        })
     }
    },
    loadSceneByCity(state:any,cityName:City) {
      //sceneByCity中沒有要篩選的cityName的話，才進行請求
      if(!state.sceneByCity[cityName]){
        store.commit('isloading')
        console.log("尋找城市景點",cityName)
        getTourismDataByCity(cityName)?.then(res=>{
          state.sceneByCity[cityName] = res.data
          store.commit('loaded')
          console.log(state.sceneByCity)
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