<template>
    <div class="itemDisplay">
        <header class="itemDisplay-header">
            <h1 class="title-font">{{itemData.Name}}</h1>
        </header>
        <div class="itemDisplay-contain p-4">
            <div class="itemDisplay-info">
                <div class="itemDisplay-img">
                    <img :src="itemData.Picture.PictureUrl1" :alt="itemData.Picture.PictureDescription1">
                </div>
                <div class="itemInfo">
                    <div class="itemInfo-adress">{{itemData.Address}}</div>
                    <div v-if="itemData.Organizer" class="itemInfo-organizer">{{itemData.Organizer}}</div>
                    <div v-if="itemData.StartTime" class="itemInfo-seTime">{{itemData.StartTime}}/{{itemData.EndTime}}</div>
                    <div class="itemInfo-web"><a :href="itemData.WebsiteUrl">相關網站</a></div>
                </div>
            </div>
            <div class="itemDisplay-Discription">
                {{itemData.DescriptionDetail}}
                {{itemData.Description}}
            </div>
        </div>
        
    </div>
    <footer class="itemDisplay-footer">
        <div class="input-group input-group-sm mb-3">
            <span class="search-nearby input-group-text" id="inputGroup-sizing-sm" @click="reSearchNearby">改變搜尋範圍</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="請以公尺為單位輸入搜尋的範圍" v-model="nearbyDistance">
        </div>
        <p>周邊美食</p>
        <div class="nearByBox">
            <FoodCardItem
                v-for="(i,index) in nearbyFood" :key="index"
                :foodData="i"
            />
        </div>
        <p>周邊活動</p>
        <div class="nearByBox">
            <ActivityCardItem
                v-for="(i,index) in nearbyActivity" :key="index"
                :activityData="i"
            />
        </div>
        <p>周邊景點</p>
        <div class="nearByBox">
            <SceneCardItem
                v-for="(i,index) in nearbyScene" :key="index"
                :sceneData="i"
            />
        </div>
        <p>周邊旅宿</p>
        <div class="nearByBox">
            <HotelCardItem
                v-for="(i,index) in nearbyHotel" :key="index"
                :hotelData="i"
            />
        </div>
    </footer>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import SceneCardItem from '@/components/card/SceneCardItem.vue'
import HotelCardItem from '@/components/card/HotelCardItem.vue'
import FoodCardItem from '@/components/card/FoodCardItem.vue'
import ActivityCardItem from '@/components/card/ActivityCardItem.vue'
import {getSceneNearby,getFoodNearby,getHotelNearby,getActivityNearby} from '../api'
export default defineComponent({
    components:{
        SceneCardItem,HotelCardItem,FoodCardItem,ActivityCardItem,
    },
    setup(){
        onMounted(()=>{
            showNearby(nearbyDistance.value) //請求周邊資料
        })
        const route = useRoute()
        const itemData = computed(()=>{
            return JSON.parse(route.query.data as string)
        })
        const nearbyDistance = ref(1000)
        const nearbyScene = ref()
        const nearbyFood = ref()
        const nearbyActivity = ref()
        const nearbyHotel = ref()
        watch(itemData,()=>{
            showNearby(nearbyDistance.value) //請求周邊資料
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
           itemData,nearbyScene,nearbyFood,nearbyActivity,nearbyHotel,nearbyDistance,
           //methods
           reSearchNearby,
        }
    }
})
</script>