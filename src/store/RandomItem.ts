import { getRandomHotelByCity, getRandomActivityByCity, getRandomSceneByCity, getRandomFoodByCity } from '../api'
import { City, CardCategory } from '@/types/enum';
export const state = {
  randomItemList:[{},{}],
};
export const actions = {
  getRandomItem(context: any) {
    let categoryNum = Math.round(((Math.random() * 3))) //隨機種類
    let cityNum = Math.round(((Math.random() * 22))) //隨機縣市
    switch (categoryNum) {
      case CardCategory.Hotel:
        getRandomHotelByCity(City[cityNum])?.then((res: any) => {
          let item = res.data[Math.round(((Math.random() * res.data.length)))]
          context.commit('loadRandomItem', item)
        }).catch((e: any) => {
          console.log(e)
        })
        break
      case CardCategory.Activity: //activity
        getRandomActivityByCity(City[cityNum])?.then((res: any) => {
          let item = res.data[Math.round(((Math.random() * res.data.length)))]
          context.commit('loadRandomItem', item)
        }).catch((e: any) => {
          console.log(e)
        })
        break
      case CardCategory.Scene: //Scene
        getRandomSceneByCity(City[cityNum])?.then((res: any) => {
          let item = res.data[Math.round(((Math.random() * res.data.length)))]
          context.commit('loadRandomItem', item)
        }).catch((e: any) => {
          console.log(e)
        })
        break
      case CardCategory.Food: //Food
        getRandomFoodByCity(City[cityNum])?.then((res: any) => {
          let item = res.data[Math.round(((Math.random() * res.data.length)))]
          context.commit('loadRandomItem', item)
        }).catch((e: any) => {
          console.log(e)
        })
        break
    }
  },
  getRandomItem2(context: any) {
    let categoryNum = Math.round(((Math.random() * 3))) //隨機種類
    let cityNum = Math.round(((Math.random() * 22))) //隨機縣市
    switch (categoryNum) {
      case CardCategory.Hotel:
        getRandomHotelByCity(City[cityNum])?.then((res: any) => {
          let item = res.data[Math.round(((Math.random() * res.data.length)))]
          context.commit('loadRandomItem2', item)
        }).catch((e: any) => {
          console.log(e)
        })
        break
      case CardCategory.Activity: //activity
        getRandomActivityByCity(City[cityNum])?.then((res: any) => {
          let item = res.data[Math.round(((Math.random() * res.data.length)))]
          context.commit('loadRandomItem2', item)
        }).catch((e: any) => {
          console.log(e)
        })
        break
      case CardCategory.Scene: //Scene
        getRandomSceneByCity(City[cityNum])?.then((res: any) => {
          let item = res.data[Math.round(((Math.random() * res.data.length)))]
          context.commit('loadRandomItem2', item)
        }).catch((e: any) => {
          console.log(e)
        })
        break
      case CardCategory.Food: //Food
        getRandomFoodByCity(City[cityNum])?.then((res: any) => {
          let item = res.data[Math.round(((Math.random() * res.data.length)))]
          context.commit('loadRandomItem2', item)
        }).catch((e: any) => {
          console.log(e)
        })
        break
    }
  }
}
export const mutations = {
  loadRandomItem(state: any, paload: any) {
    state.randomItemList[0] = paload
  },
  loadRandomItem2(state: any, paload: any) {
    state.randomItemList[1] = paload
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