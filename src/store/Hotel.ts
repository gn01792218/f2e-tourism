import {getAllHotel,getHotelByCity,getAllHotelFilteData,getHotelFilteDataByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    hotHotel:{},
    allHotel:{},
    hotelByCity:{},
    filteData:{},
  };
  export const actions = {
    getAllHotel(context:any) {
      if(JSON.stringify(state.allHotel)== '{}'){ //假如沒有資料
        store.commit('isloading')
        getAllHotel()?.then((res)=>{
          console.log("1.取得資料")
          context.commit('loadAllHotel',res.data)
          store.commit('loaded')
        })
      }
    }
  }
  export const mutations = {
    loadHotHotel(state:any){
      if(JSON.stringify(state.hotHotel)== '{}'){
        // console.log("熱門旅宿")
        getAllHotel(2)?.then(res=>{
            state.hotHotel = res.data
            // console.log('hotHotel',state.hotHotel)
        })
     }
    },
    loadAllHotel(state:any,paload:any) { 
      if(JSON.stringify(state.allHotel)== '{}'){
        console.log("2.裝資料")
        state.allHotel = paload
      }
     },
    loadHotelByCity(state:any,cityName:City) {
      if(!state.hotelByCity[cityName]){
        store.commit('isloading')
        console.log("尋找城市旅宿",cityName)
        getHotelByCity(cityName)?.then(res=>{
          state.hotelByCity[cityName] = res.data
          store.commit('loaded')
          console.log(state.hotelByCity)
        })
      }
    },
    filteData(state:any,filteData:any){
      store.commit('isloading')
      if(filteData[2]==='Taiwan'){ //從全臺篩選
        getAllHotelFilteData(filteData[0],filteData[1])?.then(res=>{
          state.filteData = res.data
          console.log("篩選全台旅宿",filteData[0],filteData[1],filteData[2])
          console.log('獲得資廖',res.data)
          store.commit('loaded')
        })
      }else{ //從各縣市篩選
        getHotelFilteDataByCity(filteData[2],filteData[0],filteData[1])?.then(res=>{
          state.filteData = res.data
          console.log(`篩選${filteData[2]}旅宿`,filteData[0],filteData[1],filteData[2])
          console.log('獲得資廖',res.data)
          store.commit('loaded')
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