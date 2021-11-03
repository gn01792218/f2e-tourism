export const state = {
    TableJoinRecall:{
      table:{
        betStatus:{},
        streamingUrl:"",
      }
    },
  };
  export const actions = {}
  
  export const mutations = {
    TableJoinRecall(state:any, payload:any) { //接收wbSocket的訊息
      state.TableJoinRecall=payload
      // console.log("vuex-tableInfo資料更新",state.TableJoinRecall)
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