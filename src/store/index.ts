import { createStore } from 'vuex'
import Scene from './Scene'
import Hotel from './Hotel'
import Food from './Food'
import Activity from './Activity'
import MyCollection from './MyCollection'
import RandomItem from './RandomItem'
import MyNearby from './MyNearby'
import { CardCategory, City } from '@/types/enum'
export default createStore({
  state: {
    loading: false, //掌管資料loading
    currentCategory: CardCategory, //掌管使用者切換到了哪個種類
    currentCity: City[0],
    currentCityChinessName: "臺灣",
    cityList: [
      {
        "CityID": "0",
        "CityName": "臺灣",
        "CityCode": "TAIWAN",
        "City": "Taiwan",
        "CountyID": "A0",
        "Version": "21.08.1"
      },
      {
        "CityID": "1",
        "CityName": "臺北市",
        "CityCode": "TPE",
        "City": "Taipei",
        "CountyID": "A",
        "Version": "21.08.1"
      },
      {
        "CityID": "4",
        "CityName": "臺中市",
        "CityCode": "TXG",
        "City": "Taichung",
        "CountyID": "B",
        "Version": "21.08.1"
      },
      {
        "CityID": "7",
        "CityName": "基隆市",
        "CityCode": "KEE",
        "City": "Keelung",
        "CountyID": "C",
        "Version": "21.08.1"
      },
      {
        "CityID": "5",
        "CityName": "臺南市",
        "CityCode": "TNN",
        "City": "Tainan",
        "CountyID": "D",
        "Version": "21.08.1"
      },
      {
        "CityID": "6",
        "CityName": "高雄市",
        "CityCode": "KHH",
        "City": "Kaohsiung",
        "CountyID": "E",
        "Version": "21.08.1"
      },
      {
        "CityID": "2",
        "CityName": "新北市",
        "CityCode": "NWT",
        "City": "NewTaipei",
        "CountyID": "F",
        "Version": "21.08.1"
      },
      {
        "CityID": "17",
        "CityName": "宜蘭縣",
        "CityCode": "ILA",
        "City": "YilanCounty",
        "CountyID": "G",
        "Version": "21.08.1"
      },
      {
        "CityID": "3",
        "CityName": "桃園市",
        "CityCode": "TAO",
        "City": "Taoyuan",
        "CountyID": "H",
        "Version": "21.08.1"
      },
      {
        "CityID": "15",
        "CityName": "嘉義市",
        "CityCode": "CYI",
        "City": "Chiayi",
        "CountyID": "I",
        "Version": "21.08.1"
      },
      {
        "CityID": "9",
        "CityName": "新竹縣",
        "CityCode": "HSQ",
        "City": "HsinchuCounty",
        "CountyID": "J",
        "Version": "21.08.1"
      },
      {
        "CityID": "10",
        "CityName": "苗栗縣",
        "CityCode": "MIA",
        "City": "MiaoliCounty",
        "CountyID": "K",
        "Version": "21.08.1"
      },
      {
        "CityID": "12",
        "CityName": "南投縣",
        "CityCode": "NAN",
        "City": "NantouCounty",
        "CountyID": "M",
        "Version": "21.08.1"
      },
      {
        "CityID": "11",
        "CityName": "彰化縣",
        "CityCode": "CHA",
        "City": "ChanghuaCounty",
        "CountyID": "N",
        "Version": "21.08.1"
      },
      {
        "CityID": "8",
        "CityName": "新竹市",
        "CityCode": "HSZ",
        "City": "Hsinchu",
        "CountyID": "O",
        "Version": "21.08.1"
      },
      {
        "CityID": "13",
        "CityName": "雲林縣",
        "CityCode": "YUN",
        "City": "YunlinCounty",
        "CountyID": "P",
        "Version": "21.08.1"
      },
      {
        "CityID": "14",
        "CityName": "嘉義縣",
        "CityCode": "CYQ",
        "City": "ChiayiCounty",
        "CountyID": "Q",
        "Version": "21.08.1"
      },
      {
        "CityID": "16",
        "CityName": "屏東縣",
        "CityCode": "PIF",
        "City": "PingtungCounty",
        "CountyID": "T",
        "Version": "21.08.1"
      },
      {
        "CityID": "18",
        "CityName": "花蓮縣",
        "CityCode": "HUA",
        "City": "HualienCounty",
        "CountyID": "U",
        "Version": "21.08.1"
      },
      {
        "CityID": "19",
        "CityName": "臺東縣",
        "CityCode": "TTT",
        "City": "TaitungCounty",
        "CountyID": "V",
        "Version": "21.08.1"
      },
      {
        "CityID": "20",
        "CityName": "金門縣",
        "CityCode": "KIN",
        "City": "KinmenCounty",
        "CountyID": "W",
        "Version": "21.08.1"
      },
      {
        "CityID": "21",
        "CityName": "澎湖縣",
        "CityCode": "PEN",
        "City": "PenghuCounty",
        "CountyID": "X",
        "Version": "21.08.1"
      },
      {
        "CityID": "22",
        "CityName": "連江縣",
        "CityCode": "LIE",
        "City": "LienchiangCounty",
        "CountyID": "Z",
        "Version": "21.08.1"
      }
    ],
  },
  mutations: {
    isloading(state: any) {
      state.loading = true
    },
    loaded(state: any) {
      state.loading = false
    },
    switchCategory(state: any, CardCategory: CardCategory) {
      state.currentCategory = CardCategory
    },
    switchCity(state: any, city = City.Taiwan) {
      state.currentCity = city

    },
    switchCityChinese(state: any, cityChinesName: string) {
      state.currentCityChinessName = cityChinesName
    }
  },
  actions: {
  },
  modules: {
    Scene, Hotel, Food, Activity, MyCollection, RandomItem, MyNearby,
  }
})
