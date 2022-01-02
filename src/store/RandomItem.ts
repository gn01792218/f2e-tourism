import {getRandomHotelByCity,getRandomActivityByCity,getRandomSceneByCity,getRandomFoodByCity} from '../api'
import {City} from '@/types/enum';
export const state = {
    randomItem:{}
  };
  export const actions = {
    getRandomItem(context:any) {
        let categoryNum= Math.round(((Math.random()*3)))
        let cityNum= Math.round(((Math.random()*22)))
        switch(categoryNum){
            case 0:
                 getRandomHotelByCity(City[cityNum])?.then((res:any)=>{
                 context.commit('loadRandomItem',res.data[Math.round(((Math.random()*res.data.length)))]) 
                //  console.log(res.data[Math.round(((Math.random()*res.data.length)))])
                //  console.log("旅館骰了一次")
                 }).catch((e:any)=>{
                  console.log(e)
                })
                 break
             case 1: //activity
                 getRandomActivityByCity(City[cityNum])?.then((res:any)=>{
                 context.commit('loadRandomItem',res.data[Math.round(((Math.random()*res.data.length)))])
                //  console.log("活動撈到資料",res.data[Math.round(((Math.random()*res.data.length)))])
                //  console.log("活動骰了一次")
                 }).catch((e:any)=>{
                  console.log(e)
                })
                 break
             case 2: //Scene
                getRandomSceneByCity(City[cityNum])?.then((res:any)=>{
                context.commit('loadRandomItem',res.data[Math.round(((Math.random()*res.data.length)))])
                // console.log("場景撈到資料",res.data[Math.round(((Math.random()*res.data.length)))])
                 }).catch((e:any)=>{
                  console.log(e)
                })
                //  console.log("場警骰了一次")
                 break
             case 3: //Food
                getRandomFoodByCity(City[cityNum])?.then((res:any)=>{
                context.commit('loadRandomItem',res.data[Math.round(((Math.random()*res.data.length)))])
                // console.log("餐飲撈到資料",res.data[Math.round(((Math.random()*res.data.length)))])
                //  console.log("餐飲骰了一次")
                 }).catch((e:any)=>{
                  console.log(e)
                })
                 break
        }
    }
  }
  export const mutations = {
    loadRandomItem(state:any,paload:any) { 
        console.log("2.裝隨機資料",paload)
        state.randomItem = paload
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