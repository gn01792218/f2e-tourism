export const state = {
  center: [], //搜尋附近的中心點
  scene: true,
  activity: false,
  food: false,
  hotel: false,
  sceneData: [],
  hotelData: [],
  foodData: [],
  activityData: [],
  showItem: {},
};
export const actions = {};

export const mutations = {
  setCenter(state: any, payload: number[]) {
    state.center = payload;
  },
  setScene(state:any,selected:boolean){
    state.scene = selected
  },
  setActivity(state:any,selected:boolean){
    state.activity = selected
  },
  setFood(state:any,selected:boolean){
    state.food = selected
  },
  setHotel(state:any,selected:boolean){
    state.hotel = selected
  },
  setSceneData(state:any,payload:any){
    state.sceneData = payload
  },
  setFoodData(state:any,payload:any){
    state.foodData = payload
  },
  setHotelData(state:any,payload:any){
    state.hotelData = payload
  },
  setActivityData(state:any,payload:any){
    state.activityData = payload
  },
  setShowItem(state:any,payload:any){
    state.showItem = payload
  }
};
export const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
