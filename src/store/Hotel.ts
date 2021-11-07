import {getAllHotel,getHotelByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    allHotel:{},
    hotelByCity:{},
  };
  export const actions = {}
  
  export const mutations = {
    loadAllHotel(state:any) { //接收wbSocket的訊息
      if(JSON.stringify(state.allHotel)== '{}'){
         console.log("執行旅宿")
         store.commit('isloading')
         getAllHotel()?.then(res=>{
             state.allHotel = res.data
             store.commit('loaded')
         })
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