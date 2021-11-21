import {getAllRestaurant,getFoodByCity,getAllFoodFilteData,getFoodFilteDataByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    hotFood:{},
    allFood:{},
    foodByCity:{},
    filteData:{},
  };
  export const actions = {
    getAllFood(context:any){
      console.log("判斷是否請求")
      if(JSON.stringify(state.allFood)== '{}'){
        store.commit('isloading')
        getAllRestaurant()?.then(res=>{
        console.log("1.請求資料")
        context.commit('loadAllFood',res.data)
        store.commit('loaded')
      }).catch((e:any)=>{
        console.log(e)
      })
      }
    }
  }
  
  export const mutations = {
    loadHotFood(state:any){
      if(JSON.stringify(state.hotFood)== '{}'){
        // console.log("熱門餐飲")
        getAllRestaurant(4)?.then(res=>{
            state.hotFood = res.data
            // console.log('hotFood',state.hotFood)
        }).catch((e:any)=>{
          console.log(e)
        })
     }
    },
    loadAllFood(state:any,payload:any) { 
      if(JSON.stringify(state.allFood)== '{}'){
        console.log("2.裝資料")
        state.allFood = payload
      }
    },
    loadFoodByCity(state:any,cityName:City) {
      if(!state.foodByCity[cityName]){
        store.commit('isloading')
        console.log("尋找城市餐飲",cityName)
        getFoodByCity(cityName)?.then(res=>{
          state.foodByCity[cityName] = res.data
          store.commit('loaded')
          console.log(state.foodByCity)
        }).catch((e:any)=>{
          console.log(e)
        })
      }
    },
    filteData(state:any,filteData:any){
      store.commit('isloading')
      if(filteData[2]==='Taiwan'){ //從全臺篩選
        getAllFoodFilteData(filteData[0],filteData[1])?.then(res=>{
          state.filteData = res.data
          console.log("篩選全台旅宿",filteData[0],filteData[1],filteData[2])
          console.log('獲得資廖',res.data)
          store.commit('loaded')
        }).catch((e:any)=>{
          console.log(e)
        })
      }else{ //從各縣市篩選
        getFoodFilteDataByCity(filteData[2],filteData[0],filteData[1])?.then(res=>{
          state.filteData = res.data
          console.log(`篩選${filteData[2]}旅宿`,filteData[0],filteData[1],filteData[2])
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