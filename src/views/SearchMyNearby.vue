<template>
    <div class="itemDisplay">
        <header class="itemDisplay-header">
            <h1>我附近有什麼?</h1>
            <div class="selectBar">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked v-model="scene">
                    <label class="form-check-label" for="flexSwitchCheckChecked">顯示景點</label>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="hotel">
                    <label class="form-check-label" for="flexSwitchCheckChecked">顯示旅宿</label>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="food">
                    <label class="form-check-label" for="flexSwitchCheckChecked">顯示餐飲</label>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="activity">
                    <label class="form-check-label" for="flexSwitchCheckChecked">顯示活動</label>
                </div>
            </div>
        </header>
        <div class="mynearbyItem-contain p-4">
            <!-- 地圖 -->
            <MyNearbyMap
                :center="myLocation"
            />
            <!-- 搜尋框 -->
            <span>變更搜尋半徑</span>
            <div class="search-container mb-3">
                <div class="searchNearby input-group input-group-sm m-3">
                <div class="searchIcon me-3" @click="reSearchNearby"></div>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="以公尺為單位輸入搜尋的範圍,ex:1000" @keypress="reSearchNearby" v-model="nearbyDistance">
            </div>
            </div>
            <div class="decorateLine"></div>
            <!-- 資訊展示處 -->
            <div class="itemDisplay-Discription" v-if="showItem">
                <h3 class="subTitle2-font travelInfo">相關資訊</h3>
                <!-- <img class="itemDisplay-img" v-if="showItem.Picture" :src="showItem.Picture.PictureUrl2" :alt="showItem.Picture.PictureDescription2"> -->
                <div class="discrption lineHeight">
                    <p class="subTitle2-font">{{showItem.DescriptionDetail}}</p>
                    <p class="subTitle2-font">{{showItem.Description}}</p>
                </div>
                <!-- <img class="itemDisplay-img" v-if="showItem.Picture" :src="showItem.Picture.PictureUrl3" :alt="showItem.Picture.PictureDescription3"> -->
                <div class="mt-5" v-if="showItem.TravelInfo">
                    <h3 class="subTitle2-font travelInfo">旅遊資訊:</h3>
                    {{showItem.TravelInfo}}
                </div>
                <div class="mt-5" v-if="showItem.ParkingPosition">
                    <h3 class="subTitle2-font travelInfo">停車資訊:</h3>
                    {{showItem.ParkingPosition}}
                </div>
                <div class="mt-5" v-if="showItem.Remarks">
                    <h3 class="subTitle2-font travelInfo">注意事項:</h3>
                    {{showItem.Remarks}}
                </div>
            </div>
        </div>
    </div>
    <footer class="itemDisplay-footer">
        <!-- 附近景點卡牌Bar -->
        <div class="nearbyContainer">
            <ul class="diplayTab nav nav-tabs">
                <li class="nav-item">
                    <a :class="['nav-link',{'active':currentNearByTag=='美食'}]" @click="currentNearByTag='美食'"><div class="foodIcon"></div>周邊美食</a>
                </li>
                <li class="nav-item">
                    <a :class="['nav-link',{'active':currentNearByTag=='活動'}]" @click="currentNearByTag='活動'"><div class="activityIcon"></div>周邊活動</a>
                </li>
                <li class="nav-item">
                    <a :class="['nav-link',{'active':currentNearByTag=='景點'}]" @click="currentNearByTag='景點'"><div class="sceneIcon"></div>周邊景點</a>
                </li>
                <li class="nav-item">
                    
                    <a :class="['nav-link',{'active':currentNearByTag=='旅宿'}]" @click="currentNearByTag='旅宿'"><div class="hotelIcon"></div>周邊旅宿</a>
                </li>
            </ul>
        <div v-if="currentNearByTag=='美食'" class="nearbyContainer mb-3 d-flex p-3">
            <h3 class="nearbyType title-font">周邊美食</h3>
            <div class="nearByBox">
                <DrageItem
                    v-for="(i,index) in nearbyFood" :key="index"
                    :data="i"
                    category="美食"
                />
            </div>
        </div>
        <div v-if="currentNearByTag=='活動'" class="nearbyContainer mb-3 d-flex p-3">
            <h3 class="nearbyType title-font">周邊活動</h3>
            <div class="nearByBox">
                <DrageItem
                    v-for="(i,index) in nearbyActivity" :key="index"
                    :data="i"
                    category="活動"
                />
            </div>
        </div>
        <div v-if="currentNearByTag=='景點'" class="nearbyContainer mb-3 d-flex p-3">
            <h3 class="nearbyType title-font">周邊景點</h3>
            <div class="nearByBox">
                <DrageItem
                    v-for="(i,index) in nearbyScene" :key="index"
                    :data="i"
                    category="景點"
                />
            </div>
        </div>
        <div v-if="currentNearByTag=='旅宿'" class="nearbyContainer mb-3 d-flex p-3">
            <h3 class="nearbyType title-font">周邊旅宿</h3>
            <div class="nearByBox">
                 <DrageItem
                    v-for="(i,index) in nearbyHotel" :key="index"
                    :data="i"
                    category="旅宿"
                />
            </div>
        </div>
        </div>
    </footer>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref , watch} from 'vue'
import {getSceneNearby,getFoodNearby,getHotelNearby,getActivityNearby} from '../api'
import MyNearbyMap from '@/components/Map/MyNearbyMap.vue'
import DrageItem from '@/components/card/DrageItem.vue'
import { useStore } from 'vuex'
export default defineComponent({
    components:{
        MyNearbyMap,
        DrageItem,
    },
    setup(){
        onMounted(()=>{
            getUserLocation()
        })
        const store = useStore()
        //使用者位置
        let myLocation = computed(()=>{
            return store.state.MyNearby.userLocation
        })
        watch(myLocation,()=>{
            showNearby(nearbyDistance.value) //取得使用者位置時，先取一次基本周邊資料
        })
        //搜尋範圍
        const nearbyDistance = ref(1000)
        //地圖篩選種類
        const scene = ref(true)
        const hotel = ref(false)
        const food = ref(false)
        const activity = ref(false)
        watch(scene,()=>{
            store.commit('MyNearby/setScene',scene.value)
        })
        watch(hotel,()=>{
            store.commit('MyNearby/setHotel',hotel.value)
        })
         watch(food,()=>{
            store.commit('MyNearby/setFood',food.value)
        })
         watch(activity,()=>{
            store.commit('MyNearby/setActivity',activity.value)
        })
        //展示用的使用者點選的item資料
        const showItem = computed(()=>{
            return store.state.MyNearby.showItem
        })
        //nearbyBar
        const currentNearByTag = ref("景點")
        const nearbyScene = computed(()=>{
            return store.state.MyNearby.sceneData
        })
        const nearbyFood = computed(()=>{
            return store.state.MyNearby.foodData
        })
        const nearbyActivity = computed(()=>{
            return store.state.MyNearby.activityData
        })
        const nearbyHotel = computed(()=>{
            return store.state.MyNearby.hotelData
        })
        function getUserLocation(){
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                store.commit('MyNearby/setUserLocation',[ position.coords.longitude,position.coords.latitude])
                // myLocation = [position.coords.latitude, position.coords.longitude]
                // console.log(myLocation)
            });
            } else {
                alert('抱歉，您的裝置無法使用地理定位')
            }
        }
        function showNearby (searchDistance:number) {
            console.log(searchDistance)
            getSceneNearby(myLocation.value[1],myLocation.value[0],searchDistance)?.
            then(res=>{
                store.commit('MyNearby/setSceneData',res.data)
                console.log(nearbyScene.value)
            })

            getActivityNearby(myLocation.value[1],myLocation.value[0],searchDistance)?.
            then(res=>{
                store.commit('MyNearby/setActivityData',res.data)
                console.log(nearbyActivity.value)
                })
   
            getFoodNearby(myLocation.value[1],myLocation.value[0],searchDistance)?.
            then(res=>{
                store.commit('MyNearby/setFoodData',res.data)
                console.log(nearbyFood.value)
                })
      
            getHotelNearby(myLocation.value[1],myLocation.value[0],searchDistance)?.
            then(res=>{
                store.commit('MyNearby/setHotelData',res.data)
                console.log(nearbyHotel.value)
                })
        }
        function reSearchNearby(){
            showNearby(nearbyDistance.value) //請求周邊資料
        }
        return{
            //data
            currentNearByTag,nearbyScene,nearbyFood,nearbyActivity,nearbyHotel,nearbyDistance,myLocation,scene,hotel,food,activity,showItem,
            //methods
            reSearchNearby,
        }
    }
})
</script>