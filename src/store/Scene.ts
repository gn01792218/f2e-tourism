import {getAllTourismData,getSceneByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    hotScene:{}, //給首頁使用
    allScene:{}, 
    sceneByCity:{},  //給預設的靜態頁面使用
  };
  export const actions = {
    getAllScene(context:any){
      console.log("判斷是否請求")
      if(JSON.stringify(state.allScene)== '{}'){
        store.commit('isloading')
        getAllTourismData()?.then(res=>{
        console.log("1.請求資料")
        context.commit('loadAllScene',res.data)
        store.commit('loaded')
      })
      }
    }
  }
  
  export const mutations = {
    loadHotScene(state:any){
      if(JSON.stringify(state.hotScene)== '{}'){
        // console.log("熱門景點")
        getAllTourismData(4)?.then(res=>{
            state.hotScene = res.data
            // console.log('hotScene',state.hotScene)
        })
     }
    },
    loadAllScene(state:any,payload:any) { 
      console.log("2.裝資料")
      state.allScene = payload
    },
    // loadAllScene(state:any) { 
    //  if(JSON.stringify(state.allScene)== '{}'){
    //     store.commit('isloading')
    //     getAllTourismData()?.then(res=>{
    //         state.allScene = res.data
    //         store.commit('loaded')
    //         console.log('all',state.allScene)
    //     })
    //  }
    // },
    loadSceneByCity(state:any,cityName:City) {
      //sceneByCity中沒有要篩選的cityName的話，才進行請求
      if(!state.sceneByCity[cityName]){
        store.commit('isloading')
        getSceneByCity(cityName)?.then(res=>{
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