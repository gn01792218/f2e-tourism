import store from '.';
import {getAllTourismData,getTourismDataByCity} from '../api'
export const state = {
    allScene:{},
  };
  export const actions = {
  }
  
  export const mutations = {
    loadAllScene(state:any) { //接收wbSocket的訊息
     if(JSON.stringify(state.allScene)== '{}'){
        console.log("執行")
        getAllTourismData()?.then(res=>{
            state.allScene = res.data
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