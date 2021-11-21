import {getAllTourismData,getSceneByCity,getAllSceneFilteData,getSceneFilteDataByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    hotScene:{}, //給首頁使用
    allScene:{}, 
    sceneByCity:{},  //給預設的靜態頁面使用
    filteData:{},
  };
  export const actions = {
    getAllScene(context:any){
      console.log("判斷是否請求")
      if(JSON.stringify(state.allScene)== '{}'){
        store.commit('isloading')
        console.log("1.取得資料")
        getAllTourismData()?.then(res=>{
        context.commit('loadAllScene',res.data)
        store.commit('loaded')
      }).catch((e:any)=>{
        console.log(e)
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
        }).catch((e:any)=>{
          console.log(e)
        })
     }
    },
    loadAllScene(state:any,payload:any) { 
      if(JSON.stringify(state.allScene)=='{}'){
        console.log("2.裝資料")
        state.allScene = payload
      }
    },
    loadSceneByCity(state:any,cityName:City) {
      //sceneByCity中沒有要篩選的cityName的話，才進行請求
      if(!state.sceneByCity[cityName]){
        store.commit('isloading')
        getSceneByCity(cityName)?.then(res=>{
          state.sceneByCity[cityName] = res.data
          store.commit('loaded')
          console.log('city',state.sceneByCity)
        }).catch((e:any)=>{
          console.log(e)
        })
      }
    },
    filteData(state:any,filteData:any){
      store.commit('isloading')
      if(filteData[2]==='Taiwan'){ //從全臺篩選
        getAllSceneFilteData(filteData[0],filteData[1])?.then(res=>{
          state.filteData = res.data
          console.log("篩選全台景點",filteData[0],filteData[1],filteData[2])
          console.log('獲得資廖',res.data)
          store.commit('loaded')
        }).catch((e:any)=>{
          console.log(e)
        })
      }else{ //從各縣市篩選
        getSceneFilteDataByCity(filteData[2],filteData[0],filteData[1])?.then(res=>{
          state.filteData = res.data
          console.log(`篩選${filteData[2]}景點`,filteData[0],filteData[1],filteData[2])
          console.log('獲得資廖',res.data)
          store.commit('loaded')
        }).catch((e:any)=>{
          console.log(e)
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