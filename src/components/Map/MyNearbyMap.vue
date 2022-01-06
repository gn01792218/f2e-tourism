<template>
    <div class="openStreeMap">
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:300px">
            <ol-view ref="view" :center="myLocation" :rotation="rotation" :zoom="zoom" :projection="projection"/>
            <ol-fullscreen-control v-if="fullscreencontrol" />
            <ol-tile-layer ref="osmLayer" title="OSM">
                <ol-source-osm />
            </ol-tile-layer>
            <!-- 使用者位置 -->
            <ol-vector-layer>
                <ol-source-vector>
                    <ol-feature>
                        <ol-geom-point :coordinates="myLocation"></ol-geom-point>
                        <ol-style>
                            <ol-style-circle :radius='userMark.radius'>
                                <ol-style-fill :color="fillColor"></ol-style-fill>
                                <ol-style-stroke :color="strokeColor" :width='strokeWidth'></ol-style-stroke>
                                <ol-style-text text="me" :scale='userMark.scale' ></ol-style-text>
                            </ol-style-circle>
                        </ol-style>
                    </ol-feature>
                </ol-source-vector>
            </ol-vector-layer>
            <!-- 附近餐飲位置 -->
            <div v-if="food">
                <ol-vector-layer v-for="(i,index) in foodData" :key="index">
                    <ol-source-vector>
                        <ol-feature>
                            <ol-geom-point :coordinates="[i.Position.PositionLon,i.Position.PositionLat]"></ol-geom-point>
                            <ol-style radius='20'>
                                <ol-style-text :text='i.RestaurantName' :scale="1.5"></ol-style-text>
                                <ol-style-icon :src="foodIcon" :scale="0.2"></ol-style-icon>
                            </ol-style>
                        </ol-feature>
                    </ol-source-vector>
                </ol-vector-layer>
            </div>
            <!-- 附近景點位置 -->
            <div v-if="scene">
                <ol-vector-layer v-for="(i,index) in sceneData" :key="index">
                    <!-- 唯一的互動方式，可是無法觸發事件 -->
                    <ol-interaction-select @select="showItem(i)">
                    </ol-interaction-select>
                    <ol-source-vector>
                    <ol-feature>
                        <ol-geom-point :coordinates="[i.Position.PositionLon,i.Position.PositionLat]"></ol-geom-point>
                        <ol-style>
                        <ol-style-circle radius='20'>
                            <ol-style-fill :color="fillColor"></ol-style-fill>
                            <ol-style-stroke :color="strokeColor" :width='strokeWidth'></ol-style-stroke>
                            <ol-style-text :text='i.ScenicSpotName' :scale="1.5"></ol-style-text>
                        </ol-style-circle>
                        </ol-style>
                    </ol-feature>
                    </ol-source-vector>
                </ol-vector-layer>
            </div>
            <!-- 附近旅宿位置 -->
            <div v-if="hotel">
                <ol-vector-layer v-for="(i,index) in hotelData" :key="index">
                    <ol-source-vector>
                    <ol-feature>
                        <ol-geom-point :coordinates="[i.Position.PositionLon,i.Position.PositionLat]"></ol-geom-point>
                        <ol-style>
                        <ol-style-circle radius='20'>
                            <ol-style-fill :color="fillColor"></ol-style-fill>
                            <ol-style-stroke :color="strokeColor" :width='strokeWidth'></ol-style-stroke>
                            <ol-style-text :text='i.HotelName' :scale="1.5"></ol-style-text>
                        </ol-style-circle>
                        </ol-style>
                    </ol-feature>
                    </ol-source-vector>
                </ol-vector-layer>
            </div>
            <!-- 附近活動位置 -->
            <div v-if="activity">
                <ol-vector-layer v-for="(i,index) in activityData" :key="index">
                    <ol-source-vector>
                    <ol-feature>
                        <ol-geom-point :coordinates="[i.Position.PositionLon,i.Position.PositionLat]"></ol-geom-point>
                        <ol-style>
                        <ol-style-circle radius='20'>
                            <ol-style-fill :color="fillColor"></ol-style-fill>
                            <ol-style-stroke :color="strokeColor" :width='strokeWidth'></ol-style-stroke>
                            <ol-style-text :text='i.ActivityName' :scale="1.5"></ol-style-text>
                        </ol-style-circle>
                        </ol-style>
                    </ol-feature>
                    </ol-source-vector>
                </ol-vector-layer>
            </div>
        </ol-map>
    </div>
</template>

<script lang="ts">
import {defineComponent , ref ,computed} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    components:{

    },
    setup(){
        const store = useStore()
        //使用者位置
        const myLocation = computed(()=>{
            return store.state.MyNearby.userLocation
        })
        const userMark = { //圖標
            radius:10,
            scale:2
        }
        //使用者篩選種類
        const scene = computed(()=>{
            return store.state.MyNearby.scene
        })
        const hotel = computed(()=>{
            return store.state.MyNearby.hotel
        })
        const food = computed(()=>{
            return store.state.MyNearby.food
        })
        const activity = computed(()=>{
            return store.state.MyNearby.activity
        })
        //各種種類data
        const sceneData = computed(()=>{
            return store.state.MyNearby.sceneData
        })
        const foodData = computed(()=>{
            return store.state.MyNearby.foodData
        })
        const hotelData = computed(()=>{
            return store.state.MyNearby.hotelData
        })
        const activityData = computed(()=>{
            return store.state.MyNearby.activityData
        })
        //icon
        const foodIcon = require('../../assets/logo.png')
        //展示item
        //地圖view基本設置
        const projection = ref('EPSG:4326')
        const zoom = ref(12)
        const rotation = ref(0)
        const radius = ref(10)
        const strokeWidth = ref(5)
        const strokeColor = ref('red')
        const fillColor = ref('white')
        const fullscreencontrol= ref(true)
        //methods
        function showItem(itemData:any){
            // showItemData.value = itemData
            store.commit('MyNearby/setShowItem',itemData)
            // if(itemData.ScenicSpotName){

            // }else if(itemData.ActivityName){

            // }else if(itemData.HotelName){

            // }else if(itemData.RestaurantName){

            // }
        }
        const selectInteactionFilter = (feature:any) => {
            return feature.values_.name != undefined;
        };
        return{
            //data
            myLocation,
            userMark,
            projection,
            zoom,
            rotation,
            scene,
            hotel,
            food,
            activity,
            radius,
            strokeWidth,
            strokeColor,
            fillColor,
            fullscreencontrol,
            sceneData,
            foodData,
            hotelData,
            activityData,
            foodIcon,
            //methods
            showItem,
            selectInteactionFilter,
        }
    }
})
</script>