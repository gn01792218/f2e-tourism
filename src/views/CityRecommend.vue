<template>
    <h1>{{city}}{{category}}推薦</h1>
    <div class="input-group mb-3">
        <input type="text" class="form-control" aria-label="Text input with dropdown button" v-model="keyWord" @keypress="filte(filteProperty,keyWord)">
        <select class="form-select" aria-label="Default select example" v-model="filteProperty">
            <option selected  value="Name">名稱篩選</option>
            <option value="Address">地址篩選</option>
            <option v-if="category=='Activity'" value="Organizer">主辦單位篩選</option>
        </select>
    </div>
    <div class="quickFilte">
        <button v-if="category=='Hotel'" @click="filte('Grade','五星')">篩選五星級飯店</button>
        <button v-if="category=='Scene'" @click="filte('Name','步道')">登山步道</button>
        <button v-if="category=='Scene'" @click="filte('DescriptionDetail','DIY')">手作DIY</button>
        <button v-if="category=='Scene'" @click="filte('DescriptionDetail','親子')">適合親子</button>
        <button v-if="category=='Activity'" @click="filte('Class1','藝文')">假掰文青路線</button>
        <button v-if="category=='Food'" @click="filte('Class','異國')">異國料理</button>
    </div>
        <p v-if="filterData.length<=0">無搜尋資料...</p>
        <div class="cardList row" v-if="category=='Scene'">
            <SceneCardItem 
                v-for="(scene,index) in filterData" :key="index"
                :sceneData="scene"
            />
        </div>
        <div class="cardList" v-if="category=='Hotel'">
            <HotelCardItem
                v-for="(hotel,index) in filterData" :key="index"
                :hotelData="hotel"
            />
        </div>
        <div class="cardList" v-if="category=='Activity'">
            <ActivityCardItem
                v-for="(active,index) in filterData" :key="index"
                :activityData="active"
            />
        </div>
        <div class="cardList" v-if="category=='Food'">
            <FoodCardItem
                v-for="(food,index) in filterData" :key="index"
                :foodData="food"
            />
        </div>
</template>

<script lang="ts">
import {computed, defineComponent,onMounted,ref,watch} from 'vue'
import SceneCardItem from '@/components/card/SceneCardItem.vue'
import HotelCardItem from '@/components/card/HotelCardItem.vue'
import ActivityCardItem from '@/components/card/ActivityCardItem.vue'
import FoodCardItem from '@/components/card/FoodCardItem.vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {CardCategory,City} from '../types/enum'
export default defineComponent({
    components:{
        SceneCardItem,HotelCardItem,ActivityCardItem,FoodCardItem,
    },
    setup(){
        const route = useRoute()
        const store = useStore()
        const city = computed(()=>{  //vuex中的當前縣市
            return store.state.currentCity
        })
        const isFilter = ref(false)
        const keyWord = ref("")
        const filteProperty = ref("Name")
        const category = computed(()=>{
            return route.params.category
        })
        const filterData = computed(()=>{
            switch(category.value){
                case CardCategory[0]:
                    if(city.value!==City[0]){ //有點選縣市的話
                        if(isFilter.value){
                            return store.state.Hotel.filteData
                        }else{
                            return  getCurrentCityData(store.state.Hotel.hotelByCity)
                        }
                    }else{
                        if(isFilter.value){
                             return store.state.Hotel.filteData
                        }else{
                            console.log("3.下載旅宿預設資料",store.state.Hotel.allHotel)
                            return store.state.Hotel.allHotel
                        }
                    }
                case CardCategory[1]:
                     if(city.value!==City[0]){
                         if(isFilter.value){
                             return store.state.Activity.filteData
                         }else{
                             return  getCurrentCityData(store.state.Activity.activityByCity)
                         }
                     }else{
                         if(isFilter.value){
                             return store.state.Activity.filteData
                         }else{
                            console.log("3.下載活動預設資料",store.state.Activity.allActivity)
                          return store.state.Activity.allActivity  
                         }
                     }
                case CardCategory[2]:
                    if(city.value!==City[0]){
                        if(isFilter.value){
                            console.log("縣市場景篩選資料")
                            return store.state.Scene.filteData
                        }else{
                            console.log("縣市場景預設資料")
                            return getCurrentCityData(store.state.Scene.sceneByCity)
                        }
                     }else{
                         if(isFilter.value){
                             console.log("全台場景篩選資料")
                             return store.state.Scene.filteData
                         }else{
                             console.log("3.下載場景預設資料",store.state.Scene.allScene)
                          return store.state.Scene.allScene 
                         }
                     }
                case CardCategory[3]:
                    if(city.value!==City[0]){
                        if(isFilter.value){
                            return store.state.Food.filteData
                        }else{
                            return getCurrentCityData(store.state.Food.foodByCity)
                        }
                     }else{
                         if(isFilter.value){
                            return store.state.Food.filteData
                        }else{
                         console.log("3.下載餐飲預設資料",store.state.Food.allFood)
                          return store.state.Food.allFood  
                          }
                     }
            }
        })
        watch(city,()=>{
            //請求縣市資料
            isFilter.value = false
            getCurrentCityDefaultData()
        })
        watch(category,()=>{ //每次進入時，都會先取得靜態所有景點資料
           //
           console.log("切換標籤",city.value)
           isFilter.value = false
            if(city.value!==City[0]){
                getCurrentCityDefaultData()
                console.log("縣市拿到的資料",filterData.value)
            }else{
                 getdefaultData()
                 console.log("全台拿到的資料",filterData.value)
            }
        })
        onMounted(()=>{
            console.log("初始化請求資料")
            getdefaultData() //先求一次資料
        })
        function getCurrentCityDefaultData () {
            if(city.value==City[0]){
                store.commit(`${category.value}/loadAll${category.value}`)
            }else{
                store.commit(`${category.value}/load${category.value}ByCity`,city.value)
            }
        }
        function getCurrentCityData (filterData:any) :any {  //請求當前縣市的所有資料
            console.log(filterData)
            let temp = filterData
            //最後要返回當前城市
            temp = temp[city.value]
            console.log(temp)
            return temp
        }
        function getdefaultData () { //請求各種類的"全臺"所有資料
            //要根據不同種類做篩選
            console.log("執行vuex請求資料")
            store.dispatch(`${category.value}/getAll${category.value}`)
        }
        function filte(filteData:string,keyWord:string) {
            isFilter.value = true
            switch(category.value){
                case CardCategory[0]:
                     store.commit('Hotel/filteData',[filteData,keyWord,city.value])
                     break
                case CardCategory[1]:
                     store.commit('Activity/filteData',[filteData,keyWord,city.value])
                     break
                case CardCategory[2]:
                     store.commit('Scene/filteData',[filteData,keyWord,city.value])
                     break
                case CardCategory[3]:
                     store.commit('Food/filteData',[filteData,keyWord,city.value])
                     break
            }
        }
        return{
            //data
            city,category,filterData,keyWord,filteProperty,
            //methods
            filte,
        }
    }
})
</script>