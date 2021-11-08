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
                :hotelData="active"
            />
        </div>
        <div class="cardList" v-if="category=='Food'">
            <FoodCardItem
                v-for="(food,index) in filterData" :key="index"
                :hotelData="food"
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
        const city = computed(()=>{  //字串
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
                        console.log("預設的旅宿資料",store.state.Hotel.allHotel)
                        return store.state.Hotel.allHotel
                    }
                case CardCategory[1]:
                     if(city.value!==City[0]){
                          return  getCurrentCityData(store.state.Activity.activityByCity)
                     }else{
                         console.log("預設的活動資料",store.state.Activity.allActivity)
                          return store.state.Activity.allActivity  
                     }
                case CardCategory[2]:
                    if(city.value!==City[0]){
                          return getCurrentCityData(store.state.Scene.sceneByCity)
                     }else{
                         console.log("預設的場警資料",store.state.Scene.allScene)
                          return store.state.Scene.allScene  
                     }
                case CardCategory[3]:
                    if(city.value!==City[0]){
                          return getCurrentCityData(store.state.Food.foodByCity)
                     }else{
                         console.log("預設的餐廳資料",store.state.Food.allFood)
                          return store.state.Food.allFood  
                     }
            }
        })
        watch(city,()=>{
            //請求縣市資料
            if(city.value==City[0]){
                store.commit(`${category.value}/loadAll${category.value}`)
            }else{
                store.commit(`${category.value}/load${category.value}ByCity`,city.value)
            }
        })
        watch(category,()=>{ //每次進入時，都會先取得靜態所有景點資料
            getdefaultData()
        })
        onMounted(()=>{
            getdefaultData() //先求一次資料
        })
        function getCurrentCityData (filterData:any) :any {
            console.log(filterData)
            let temp = filterData
            //最後要返回當前城市
            temp = temp[city.value]
            console.log(temp)
            return temp
        }
        function getdefaultData () {
            //要根據不同種類做篩選
            // console.log(`${category.value}/getAll${category.value}`==="Hotel/getAllHotel")
            // store.dispatch(`${category.value}/getAll${category.value}`)
            store.commit(`${category.value}/loadAll${category.value}`)
        }
        return{
            //data
            city,category,filterData,
        }
    }
})
</script>