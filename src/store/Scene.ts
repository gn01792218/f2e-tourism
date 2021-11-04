import {getAllTourismData,getTourismDataByCity} from '../api'
export const state = {
    allScene:{},
    sceneByCity:{},
  };
  export const actions = {
  }
  
  export const mutations = {
    loadAllScene(state:any) { 
     if(JSON.stringify(state.allScene)== '{}'){
        console.log("執行")
        getAllTourismData()?.then(res=>{
            state.allScene = res.data
        })
     }
    },
    loadSceneByCity(state:any,cityName:City) {
      //sceneByCity中沒有要篩選的cityName的話，才進行請求
      if(!state.sceneByCity[cityName]){
        console.log("尋找城市景點",cityName)
        getTourismDataByCity(cityName)?.then(res=>{
          state.sceneByCity[cityName] = res.data
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