<template>
    <div class="itemDisplay">
        <header class="itemDisplay-header">
            <!-- <h1 class="title-font">{{itemData.Name}}</h1> -->
            <h1 v-show="itemData.RestaurantName">{{itemData.RestaurantName}}</h1>
            <h1 v-show="itemData.ScenicSpotName">{{itemData.ScenicSpotName}}</h1>
            <h1 v-show="itemData.HotelName">{{itemData.HotelName}}</h1>
            <h1 v-show="itemData.ActivityName">{{itemData.ActivityName}}</h1>
        </header>
        <div class="itemDisplay-contain p-4">
            <div class="itemDisplay-info  mb-3">
                <div class="itemDisplay-img">
                    <img v-if="itemData.Picture.PictureUrl1" :src="itemData.Picture.PictureUrl1" :alt="itemData.Picture.PictureDescription1">
                    <img v-else src='../assets/images/defaultImg.png' alt="作者無提供照片">
                </div>
                <div class="itemInfo">
                    <div v-if="itemData.Grade" class="d-flex">
                        <div class="hotelGradeIcon me-2"></div>
                        <p class="itemInfo-Grade">{{itemData.Grade}}</p>
                    </div>
                    <div v-if="itemData.Spec" class="d-flex">
                        <div class="priceIcon me-2"></div>
                        <p class="itemInfo-Spec">{{itemData.Spec}}</p>
                    </div>
                    <div v-if="itemData.TicketInfo" class="d-flex">
                        <div class="priceIcon me-2"></div>
                        <p class="itemInfo-TicketInfo">{{itemData.TicketInfo}}</p>
                    </div>
                    <div v-if="itemData.Phone" class="d-flex">
                        <div class="phoneIcon me-2"></div>
                        <p class="itemInfo-Phone">{{itemData.Phone}}</p>
                    </div>
                    <div class="d-flex">
                        <div class="webSiteIcon"></div>
                        <div class="itemInfo-web"><a :href="itemData.WebsiteUrl" target="_blank">相關網站</a></div>
                    </div>
                    <div v-if="itemData.OpenTime" class="d-flex">
                        <div class="seeScheduleIcon"></div>
                        <div class="itemInfo-OpenTime">{{itemData.OpenTime}}</div>
                    </div>
                    <div class="d-flex">
                        <div class="locationIcon"></div>
                        <div class="itemInfo-adress">{{itemData.Address}}</div>
                    </div>
                    <div v-if="itemData.Organizer" class="d-flex">
                        <div class="organizerIcon"></div>
                        <div  class="itemInfo-organizer">{{itemData.Organizer}}</div>
                    </div>
                    <div v-if="itemData.StartTime" class="d-flex">
                        <div class="seeScheduleIcon"></div>
                        <div  class="itemInfo-seTime">{{itemData.StartTime}}/{{itemData.EndTime}}</div>
                    </div>
                </div>
            </div>
            <div class="decorateLine"></div>
            <div class="itemDisplay-Discription">
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
                
            </div>
        </div>
        
    </div>
    <footer class="itemDisplay-footer">
        <div class="search-container mb-3">
            <div class="searchNearby input-group input-group-sm m-3">
            <div class="searchIcon me-3" @click="reSearchNearby"></div>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="以公尺為單位輸入搜尋的範圍,ex:1000" @keypress="reSearchNearby" v-model="nearbyDistance">
        </div>
        </div>
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
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import DrageItem from '@/components/card/DrageItem.vue'
import {getSceneNearby,getFoodNearby,getHotelNearby,getActivityNearby} from '../api'
export default defineComponent({
    components:{
        DrageItem,
    },
    setup(){
        onMounted(()=>{
            showNearby(nearbyDistance.value) //請求周邊資料
        })
        const route = useRoute()
        const currentNearByTag = ref("景點")
        const itemData = computed(()=>{
            if(route.query.data){
                return JSON.parse(route.query.data as string)
            }
        })
        const nearbyDistance = ref(1000)
        const nearbyScene = ref()
        const nearbyFood = ref()
        const nearbyActivity = ref()
        const nearbyHotel = ref()
        watch(itemData,()=>{
            if(itemData.value){
                 showNearby(nearbyDistance.value) //請求周邊資料
            }
        })
        function showNearby (searchDistance:number) {
            getSceneNearby(itemData.value.Position.PositionLat,itemData.value.Position.PositionLon,searchDistance)?.
            then(res=>{nearbyScene.value = res.data})

            getActivityNearby(itemData.value.Position.PositionLat,itemData.value.Position.PositionLon,searchDistance)?.
            then(res=>{nearbyActivity.value = res.data})
   
            getFoodNearby(itemData.value.Position.PositionLat,itemData.value.Position.PositionLon,searchDistance)?.
            then(res=>{nearbyFood.value = res.data})
      
            getHotelNearby(itemData.value.Position.PositionLat,itemData.value.Position.PositionLon,searchDistance)?.
            then(res=>{nearbyHotel.value = res.data})
        }
        function reSearchNearby(){
            showNearby(nearbyDistance.value) //請求周邊資料
        }
        return{ 
            //data
           itemData,nearbyScene,nearbyFood,nearbyActivity,nearbyHotel,nearbyDistance,currentNearByTag,
           //methods
           reSearchNearby,
        }
    }
})
</script>