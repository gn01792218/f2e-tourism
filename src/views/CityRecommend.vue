<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" aria-label="Text input with dropdown button" v-model="keyWord" @keypress="filte(filteProperty,keyWord)">
        <select class="form-select" aria-label="Default select example" v-model="filteProperty">
            <option selected  value="Name">名稱篩選</option>
            <option value="Address">地址篩選</option>
            <option value="Description">關鍵字篩選</option>
            <option v-if="category=='Activity'" value="Organizer">主辦單位篩選</option>
        </select>
    </div>
 
    <div class="quickFilte">
        <div class="me-5">
            <div class="filterIcon"></div>
            <p>快速篩選</p>
        </div>
        <button class="fiveStarHotel me-3" v-if="category=='Hotel'" @click="filte('Grade','五星')">五星級飯店</button>
        <button class="sea me-3" v-if="category=='Hotel'" @click="filte('Description','海景')">海景</button>
        <button class="babyHotel me-3" v-if="category=='Hotel'" @click="filte('Description','親子')">適合親子</button>
        <button class="spa me-3" v-if="category=='Hotel'" @click="filte('Description','溫泉')">溫泉</button>
        <button class="trail me-3" v-if="category=='Scene'" @click="filte('Name','步道')">登山步道</button>
        <button class="diy me-3" v-if="category=='Scene'" @click="filte('DescriptionDetail','DIY')">手作DIY</button>
        <button class="babyScene me-3" v-if="category=='Scene'" @click="filte('DescriptionDetail','親子')">適合親子</button>
        <button class="hipster me-3" v-if="category=='Activity'" @click="filte('Class1','藝文')">文青路線</button>
        <button class="music me-3" v-if="category=='Activity'" @click="filte('Description','音樂')">音樂活動</button>
        <button class="festival me-3" v-if="category=='Activity'" @click="filte('Description','節慶')">文化節慶</button>
        <button class="exotic me-3" v-if="category=='Food'" @click="filte('Class','異國')">異國料理</button>
        <button class="chineseFood me-3" v-if="category=='Food'" @click="filte('Class','中式')">中式料理</button>
        <button class="coffe me-3" v-if="category=='Food'" @click="filte('Description','咖啡')">特色咖啡廳</button>
        <button class="brunch me-3" v-if="category=='Food'" @click="filte('Description','早午')">早午餐</button>
        <button class="squid me-3"  @click="filte('Description','魷魚')">魷魚</button>
    </div>
    <p v-if="filterData.length<=0">無搜尋資料...</p>
    <h2 class="title-font">{{city}}{{category}}推薦</h2>
    <div class="cardList row" v-if="category=='Scene'">
            <SceneCardItem 
                v-for="(scene,index) in showData" :key="index"
                :sceneData="scene"
            />
    </div>
    <div class="cardList" v-if="category=='Hotel'">
            <HotelCardItem
                v-for="(hotel,index) in showData" :key="index"
                :hotelData="hotel"
            />
    </div>
    <div class="cardList" v-if="category=='Activity'">
            <ActivityCardItem
                v-for="(active,index) in showData" :key="index"
                :activityData="active"
            />
    </div>
    <div class="cardList" v-if="category=='Food'">
            <FoodCardItem
                v-for="(food,index) in showData" :key="index"
                :foodData="food"
            />
    </div>
</template>

<script lang="ts">
import {computed, defineComponent,onMounted,reactive,ref,watch} from 'vue'
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
        onMounted(()=>{
            console.log("初始化請求資料")
            getdefaultData() //先求一次資料
            let body = document.body
            body.addEventListener('onscroll',()=>{
                console.log('觸發滾動')
                loadData(filterData.value)
            })
        })
        const route = useRoute()
        const category = computed(()=>{
            return route.params.category
        })
        const store = useStore()
        const city = computed(()=>{  //vuex中的當前縣市
            return store.state.currentCity
        })
        const isFilter = ref(false)
        const keyWord = ref("")
        const filteProperty = ref("Name")
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
        let showData = reactive([]) //瀑布式載入所顯示的內容
        const preLoadDone = ref(false)
        const preLoadNum = reactive([4,8])  //預載入的筆數，第一個給場景和旅宿 //第二個給活動和餐飲
        const loadDataCount = ref(0)
        const windowHeight = document.body.offsetHeight //body的高度
        watch(city,()=>{
            //請求縣市資料
            isFilter.value = false
            getCurrentCityDefaultData()
        })
        watch(category,()=>{ //每次進入時，都會先取得靜態所有景點資料
           //
           console.log("切換標籤",city.value)
           isFilter.value = false
           preLoadDone.value = false
           showData = []
           loadDataCount.value = 0
            if(city.value!==City[0]){
                getCurrentCityDefaultData()
                console.log("縣市拿到的資料",filterData.value)
            }else{
                 getdefaultData()
                 console.log("全台拿到的資料",filterData.value)
            }
        })
        watch(filterData,()=>{
            console.log('來原料變動')
            if(!preLoadDone.value){
                preLoadShowData(filterData.value)
            }
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
        function preLoadShowData(DataArr:[]){
            console.log('預先莊的資料來源',DataArr)
            switch(category.value){
                case 'Scene':
                case 'Hotel':
                        //場景和旅宿要推兩個
                    if(filterData.value.length<preLoadNum[0]){
                        for(let i = 0 ; i <filterData.value.length ; i ++){
                            showData.push(DataArr[loadDataCount.value++])
                        }
                    }else{
                        for(let i = 0 ; i <preLoadNum[0] ; i ++){
                            showData.push(DataArr[loadDataCount.value++])
                        }
                    }
                    break
                case 'Activity':
                case 'Food':
                        //餐飲和活動要推四個
                    if(filterData.value.length<preLoadNum[1]){
                        for(let i = 0 ; i <filterData.value.length ; i ++){
                            showData.push(DataArr[loadDataCount.value++])
                        }
                    }else{
                        for(let i = 0 ; i <preLoadNum[1] ; i ++){
                            showData.push(DataArr[loadDataCount.value++])
                        }
                    }
                    break
                }
                preLoadDone.value = true
        }
        function loadData(DataArr:[]){
            //景點和旅宿都只有兩個
            //餐飲或活動會有四個
            let scrollTranslate = window.scrollY //滾條的位移量
            let scrollHeight = document.body.scrollHeight //滾條的總長度
            if(scrollTranslate+windowHeight>scrollHeight){
                switch(category.value){
                    case 'Scene':
                    case 'Hotel':
                        //場景和旅宿要推兩個
                        for(let i = 0 ; i <2 ; i ++){
                            showData.push(DataArr[loadDataCount.value++])
                        }
                        break
                    case 'Activity':
                    case 'Food':
                        //餐飲和活動要推四個
                        for(let i = 0 ; i <4 ; i ++){
                            showData.push(DataArr[loadDataCount.value++])
                        }
                        break
                }
            }
        }
        return{
            //data
            city,category,filterData,keyWord,filteProperty,showData,
            //methods
            filte,
        }
    }
})
</script>