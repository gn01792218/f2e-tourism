import {getAllActivity,getActivityByCity,getAllActivityFilteData,getActivityFilteDataByCity} from '../api'
import {City} from '@/types/enum';
import store from '../store'
export const state = {
  hotActivity:{},
  allActivity:{},
  activityByCity:{},
  filteData:{},
  newDate:new Date()
};
  export const actions = {
    getAllActivity(context:any){
      console.log("判斷是否請求")
      if(JSON.stringify(state.allActivity)== '{}'){
        store.commit('isloading')
        getAllActivity()?.then(res=>{
        console.log("1.請求資料")
        context.commit('loadAllActivity',res.data)
        store.commit('loaded')
      })
      }
    }
  }
  export const mutations = {
    loadHotActivity(state:any){
      if(JSON.stringify(state.hotActivity)== '{}'){
        // console.log("熱門活動")
        getAllActivity(4)?.then(res=>{
            state.hotActivity = res.data
            .filter((i:any)=>{
              return Date.parse(i.StartTime) >Date.parse(state.newDate)
            })
            .sort((a:any,b:any)=>{
              return Date.parse(a.StartTime) - Date.parse(b.StartTime)
            })
            
            console.log('hotActivity',state.hotActivity)
        }).catch((e:any)=>{
          console.log(e)
        })
     }
    },
     loadAllActivity(state:any,payload:any) {  //裝預設資料
      if(JSON.stringify(state.allActivity)== '{}'){
        console.log("2.裝資料")
        state.allActivity = payload
        .filter((i:any)=>{
          return Date.parse(i.StartTime) >Date.parse(state.newDate)
        })
        .sort((a:any,b:any)=>{
          return Date.parse(a.StartTime) - Date.parse(b.StartTime)
        }) 
      }
     },
     loadActivityByCity(state:any,cityName:City) {
      if(!state.activityByCity[cityName]){
        store.commit('isloading')
        console.log("尋找城市活動",cityName)
        getActivityByCity(cityName)?.then(res=>{
          state.activityByCity[cityName] = res.data
          .filter((i:any)=>{
            return Date.parse(i.StartTime) >Date.parse(state.newDate)
          })
          .sort((a:any,b:any)=>{
            return Date.parse(a.StartTime) - Date.parse(b.StartTime)
          }) 
          store.commit('loaded')
          console.log(state.activityByCity)
        }).catch((e:any)=>{
          console.log(e)
        })
      }
    },
    filteData(state:any,filteData:any){
      store.commit('isloading')
      if(filteData[2]==='Taiwan'){ //從全臺篩選
        getAllActivityFilteData(filteData[0],filteData[1])?.then(res=>{
          state.filteData = res.data
          .filter((i:any)=>{
            return Date.parse(i.StartTime) >Date.parse(state.newDate)
          })
          .sort((a:any,b:any)=>{
            return Date.parse(a.StartTime) - Date.parse(b.StartTime)
          }) 
          console.log("篩選全台旅宿",filteData[0],filteData[1],filteData[2])
          console.log('獲得資廖',res.data)
          store.commit('loaded')
        }).catch((e:any)=>{
          console.log(e)
        })
      }else{ //從各縣市篩選
        getActivityFilteDataByCity(filteData[2],filteData[0],filteData[1])?.then(res=>{
          state.filteData = res.data
          .filter((i:any)=>{
            return Date.parse(i.StartTime) >Date.parse(state.newDate)
          })
          .sort((a:any,b:any)=>{
            return Date.parse(a.StartTime) - Date.parse(b.StartTime)
          }) 
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