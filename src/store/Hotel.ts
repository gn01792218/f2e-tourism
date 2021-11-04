import {getAllHotel,getHotelByCity} from '../api'
export const state = {
    allHotel:{},
    hotelByCity:{},
  };
  export const actions = {}
  
  export const mutations = {
    loadAllHotel(state:any) { //接收wbSocket的訊息
      if(JSON.stringify(state.allHotel)== '{}'){
         console.log("執行旅宿")
         getAllHotel()?.then(res=>{
             state.allHotel = res.data
         })
      }
     },
     loadHotelByCity(state:any,cityName:City) {
      if(!state.hotelByCity[cityName]){
        console.log("尋找城市旅宿",cityName)
        getHotelByCity(cityName)?.then(res=>{
          state.hotelByCity[cityName] = res.data
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