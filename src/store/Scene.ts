import {getAllTourismData,getTourismDataByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    hotScene:{}, //給首頁使用
    allScene:{}, 
    sceneByCity:{},  //給預設的靜態頁面使用
  };
  export const actions = {
  }
  
  export const mutations = {
    loadHotScene(state:any){
      if(JSON.stringify(state.hotScene)== '{}'){
        console.log("熱門景點")
        getAllTourismData(4)?.then(res=>{
            state.hotScene = res.data
            console.log('hotScene',state.hotScene)
        })
     }
    },
    loadAllScene(state:any) { 
     if(JSON.stringify(state.allScene)== '{}'){
        store.commit('isloading')
        getAllTourismData()?.then(res=>{
            state.allScene = res.data
            store.commit('loaded')
            console.log('all',state.allScene)
        })
     }
    },
    loadSceneByCity(state:any,cityName:City) {
      //sceneByCity中沒有要篩選的cityName的話，才進行請求
      if(!state.sceneByCity[cityName]){
        store.commit('isloading')
        getTourismDataByCity(cityName)?.then(res=>{
          state.sceneByCity[cityName] = res.data
          store.commit('loaded')
          console.log('city',state.sceneByCity)
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