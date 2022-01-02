export const state = {
  userLocation: [], //使用者的地理位置座標
};
export const actions = {

}

export const mutations = {
  setUserLocation(state: any, payload: number[]) {
    state.userLocation = payload
    console.log(state.userLocation)
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