import {getAllHotel,getHotelByCity} from '../api'
import  {City} from '@/types/enum';
import store from '../store'
export const state = {
    hotHotel:{},
    allHotel:{},
    hotelByCity:{},
  };
  export const actions = {
    // getAllHotel(context:any) {
    //   if(JSON.stringify(state.allHotel)== '{}'){ //假如沒有資料
    //     store.commit('isloading')
    //     getAllHotel()?.then(res=>{
    //       context.commit('loadAllHotel',res.data)
    //       store.commit('loaded')
    //     })
    //   }
    // }
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
    // loadAllHotel(state:any,paload:any) { 
    //   state.allHotel = paload
    //  },
     loadAllHotel(state:any) { 
      if(JSON.stringify(state.allHotel)== '{}'){
         store.commit('isloading')
         getAllHotel()?.then(res=>{
             state.allHotel = res.data
             store.commit('loaded')
             console.log(state.allHotel)
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