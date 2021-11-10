<template>
    <h1>{{city}}{{category}}推薦</h1>
    <!-- 1.預設展示所有城市相關推薦景點前200名 -->
        <div class="cardList row" v-if="category=='Scene'">
            <SceneCardItem 
                v-for="(scene,index) in filterData" :key="index"
                :sceneData="scene"
            />
        </div>
        <!-- {{filterData}} -->
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
import {computed, defineComponent,onMounted,watch} from 'vue'
import SceneCardItem from '@/components/SceneCardItem.vue'
import HotelCardItem from '@/components/HotelCardItem.vue'
import ActivityCardItem from '@/components/ActivityCardItem.vue'
import FoodCardItem from '@/components/FoodCardItem.vue'
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
        const category = computed(()=>{
            return route.params.category
        })
        const filterData = computed(()=>{
            switch(category.value){
                case CardCategory[0]:
                    if(city.value!==City[0]){ //有點選縣市的話
                        return  getCurrentCityData(store.state.Hotel.hotelByCity)
                    }else{
                        console.log("3.下載旅宿預設資料",store.state.Hotel.allHotel)
                        return store.state.Hotel.allHotel
                    }
                case CardCategory[1]:
                     if(city.value!==City[0]){
                          return  getCurrentCityData(store.state.Activity.activityByCity)
                     }else{
                         console.log("3.下載旅宿預設資料",store.state.Activity.allActivity)
                          return store.state.Activity.allActivity  
                     }
                case CardCategory[2]:
                    if(city.value!==City[0]){
                          return getCurrentCityData(store.state.Scene.sceneByCity)
                     }else{
                         console.log("3.下載場景預設資料",store.state.Scene.allScene)
                          return store.state.Scene.allScene  
                     }
                case CardCategory[3]:
                    if(city.value!==City[0]){
                          return getCurrentCityData(store.state.Food.foodByCity)
                     }else{
                         console.log("3.下載餐飲預設資料",store.state.Food.allFood)
                          return store.state.Food.allFood  
                     }
            }
        })
        watch(city,()=>{
            //請求縣市資料
            getCurrentCityDefaultData()
        })
        watch(category,()=>{ //每次進入時，都會先取得靜態所有景點資料
            console.log("切換標籤",category.value)
            getdefaultData()
            if(city.value){
                getCurrentCityDefaultData()
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
        return{
            //data
            city,category,filterData,
        }
    }
})
</script>