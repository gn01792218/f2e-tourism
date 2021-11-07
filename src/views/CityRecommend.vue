<template>
    <h1>{{city}}{{cardCategory}}推薦</h1>
    <!-- 1.預設展示所有城市相關推薦景點前200名 -->
    <!-- {{filterData}} -->
    <div class="cardList">
        <SceneCardItem 
        v-for="(card,index) in filterData" :key="index"
        :imgSrc="card.Picture.PictureUrl1"
        :title="card.Name"
        :imgAlt="card.Picture.PictureDescription1"
        :description="card.DescriptionDetail"
        :openTime="card.OpenTime"
        :city="card.City"
        />
    </div>
    
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, watch} from 'vue'
import SceneCardItem from '@/components/SceneCardItem.vue'
import {useStore} from 'vuex'
import {CardCategory,City} from '../types/enum'
export default defineComponent({
    components:{
        SceneCardItem,
    },
    setup(){
        const store = useStore()
        const city = computed(()=>{  //字串
            return store.state.currentCity
        })
        const cardCategory = computed(()=>{  //回傳Enum的index
            return store.state.currentCategory
        })
        const filterData = computed(()=>{
            switch(cardCategory.value){
                case CardCategory[0]:
                    if(city.value!==City[0]){ //有點選縣市的話
                        return getCurrentCityData(store.state.Hotel.hotelByCity)
                    }else{
                        return store.state.Hotel.allHotel
                    }
                case CardCategory[1]:
                     if(city.value!==City[0]){
                          return getCurrentCityData(store.state.Activity.activityByCity)
                     }else{
                          return store.state.Activity.allActivity  
                     }
                case CardCategory[2]:
                    if(city.value!==City[0]){
                          return getCurrentCityData(store.state.Scene.sceneByCity)
                     }else{
                          return store.state.Scene.allScene  
                     }
                case CardCategory[3]:
                    if(city.value!==City[0]){
                          return getCurrentCityData(store.state.Food.foodByCity)
                     }else{
                          return store.state.Food.allFood  
                     }
                    
            }
        })
        watch(city,()=>{
            //請求縣市資料
            if(city.value==City[0]){
                store.commit(`${cardCategory.value}/loadAll${cardCategory.value}`)
            }else{
                store.commit(`${cardCategory.value}/load${cardCategory.value}ByCity`,city.value)
            }
        })
        //取得靜態所有景點資料
        //之後考慮只渲染top前100
        onMounted(()=>{
            getdefaultData()  //一開始就請求資料
        })
        function getCurrentCityData (filterData:any) {
            let temp = filterData
            //最後要返回當前城市
            temp = temp[city.value]
            console.log(temp)
            return temp
        }
        function getdefaultData () {
            //要根據不同種類做篩選
            store.commit(`${cardCategory.value}/loadAll${cardCategory.value}`)
        }
        // loadDefaultItem(cardCategory.value)
        // function loadDefaultItem (category:string) {  //載入推薦的行程
        //     switch(category){
        //         case CardCategory[0]:
        //             store.commit('Scene/loadSceneByCity',city.value)
        //             break
        //         case CardCategory[1]:
        //             store.commit('Hotel/loadHotelByCity',city.value)
        //             break
        //         case CardCategory[2]:
        //             store.commit('Food/loadFoodByCity',city.value)
        //             break
        //         case CardCategory[3]:
        //             store.commit('Activity/loadActivityByCity',city.value)
        //             break
        //     }
        // }  
        return{
            //data
            city,cardCategory,filterData,
        }
    }
})
</script>