<template>
    <div class="itemDisplay">
        <header class="itemDisplay-header">
            <h1>我附近有什麼?</h1>
        </header>
        <div class="mynearbyItem-contain p-4">
            <!-- 地圖 -->
            <OpenStreeMap 
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
            <!-- <div class="itemDisplay-Discription" v-if="itemData">
                <h3 class="subTitle2-font travelInfo">相關資訊</h3>
                <img class="itemDisplay-img" v-if="itemData.Picture.PictureUrl2" :src="itemData.Picture.PictureUrl2" :alt="itemData.Picture.PictureDescription2">
                <div class="discrption lineHeight">
                    <p class="subTitle2-font">{{itemData.DescriptionDetail}}</p>
                    <p class="subTitle2-font">{{itemData.Description}}</p>
                </div>
                <img class="itemDisplay-img" v-if="itemData.Picture.PictureUrl3" :src="itemData.Picture.PictureUrl3" :alt="itemData.Picture.PictureDescription3">
                <div class="mt-5" v-if="itemData.TravelInfo">
                    <h3 class="subTitle2-font travelInfo">旅遊資訊:</h3>
                    {{itemData.TravelInfo}}
                </div>
                <div class="mt-5" v-if="itemData.ParkingPosition">
                    <h3 class="subTitle2-font travelInfo">停車資訊:</h3>
                    {{itemData.ParkingPosition}}
                </div>
                <div class="mt-5" v-if="itemData.Remarks">
                    <h3 class="subTitle2-font travelInfo">注意事項:</h3>
                    {{itemData.Remarks}}
                </div>
            </div> -->
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
import OpenStreeMap from '@/components/OpenStreeMap.vue'
import DrageItem from '@/components/card/DrageItem.vue'
import { useStore } from 'vuex'
export default defineComponent({
    components:{
        OpenStreeMap,
        DrageItem,
    },
    setup(){
        onMounted(()=>{
            getUserLocation()
            console.log('取得使用者位置')
        })
        const store = useStore()
        //使用者位置
        let myLocation = computed(()=>{
            return store.state.MyNearby.userLocation
        })
        //搜尋範圍
        const nearbyDistance = ref(1000)
        //nearbyBar
        const currentNearByTag = ref("景點")
        const nearbyScene = ref()
        const nearbyFood = ref()
        const nearbyActivity = ref()
        const nearbyHotel = ref()
        //選擇的item
        const itemData = computed(()=>{
            return 'A'
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
            getSceneNearby(myLocation.value[0],myLocation.value[1],searchDistance)?.
            then(res=>{nearbyScene.value = res.data})

            getActivityNearby(myLocation.value[0],myLocation.value[1],searchDistance)?.
            then(res=>{nearbyActivity.value = res.data})
   
            getFoodNearby(myLocation.value[0],myLocation.value[1],searchDistance)?.
            then(res=>{nearbyFood.value = res.data})
      
            getHotelNearby(myLocation.value[0],myLocation.value[1],searchDistance)?.
            then(res=>{nearbyHotel.value = res.data})
        }
        function reSearchNearby(){
            showNearby(nearbyDistance.value) //請求周邊資料
        }
        return{
            //data
            currentNearByTag,nearbyScene,nearbyFood,nearbyActivity,nearbyHotel,nearbyDistance,itemData,myLocation,
            //methods
            reSearchNearby,
        }
    }
})
</script>