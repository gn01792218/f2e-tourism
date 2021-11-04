import {getAllHotel,getHotelByCity} from '../api'
export const state = {
    allHotel:{}
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