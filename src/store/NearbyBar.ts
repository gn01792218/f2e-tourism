export const state = {
    center: [], //搜尋附近的中心點
  };
  export const actions = {
  
  }
  
  export const mutations = {
    setCenter(state: any, payload: number[]) {
      state.center = payload
      console.log('設置中心',state.center)
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