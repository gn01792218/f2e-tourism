export const state = {
    schedulelist:{}, //旅遊清單
    sceneList:{}, 
    foodList:{},
    hotelList:{},
    activityList:{},
  };
  export const actions = {

  }
  
  export const mutations = {
    getSchdulelist(state:any){  //獲得我的旅遊清單。每次儲存新日期時會呼叫；安排行程元件起始也會呼叫
        let map = localStorage.getItem('scheduleListIDMap')?.split('#')
        if(map){
            map.splice(map.length-1,1)
            state.schedulelist = map.map((i)=>{
                console.log(JSON.parse(localStorage.getItem(i) as any))
                return JSON.parse(localStorage.getItem(i) as any)
            })
        }
    },
    getSceneList(state:any){
        let map = localStorage.getItem('sceneCollectList')?.split('#')
        if(map){
            map.splice(map.length-1,1)
            state.sceneList = map.map(i=>{
                return JSON.parse(localStorage.getItem(i) as string)
            })
        }
    },
    getFoodList(state:any){
        let map = localStorage.getItem('foodCollectList')?.split('#')
        if(map){
            map.splice(map.length-1,1)
            state.foodList = map.map(i=>{
                return JSON.parse(localStorage.getItem(i) as string)
            })
        }
    },
    getHotelList(state:any){
        let map = localStorage.getItem('hotelCollectList')?.split('#')
        if(map){
            map.splice(map.length-1,1)
            state.hotelList = map.map(i=>{
                return JSON.parse(localStorage.getItem(i) as string)
            })
        }
    },
    getActivityList(state:any){
        let map = localStorage.getItem('activityCollectList')?.split('#')
        if(map){
            map.splice(map.length-1,1)
            state.activityList = map.map(i=>{
                return JSON.parse(localStorage.getItem(i) as string)
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