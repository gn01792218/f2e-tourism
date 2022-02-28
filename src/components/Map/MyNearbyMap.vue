<template>
    <div class="openStreeMap">
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:400px">
            <ol-view ref="view" :center="myLocation" :rotation="rotation" :zoom="zoom" :projection="projection"/>
            <ol-fullscreen-control v-if="fullscreencontrol" />
            <ol-scaleline-control/>
            <ol-zoom-control />
             <ol-zoomslider-control />
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
                <ol-overlay :position="[i.Position.PositionLon,i.Position.PositionLat]" v-for="(i) in foodData" :key="i">
                    <template v-slot="slotProps">
                        <div class="overlay-content d-flex flex-column align-items-center" @click="showItem(i)">
                            <div class="foodIcon"></div>
                            {{i.RestaurantName}}
                            <span style="display:none">{{slotProps}}</span>
                        </div>
                    </template>
                </ol-overlay>
            </div>
            <!-- 附近景點位置 -->
            <div v-if="scene">
                <ol-overlay :position="[i.Position.PositionLon,i.Position.PositionLat]" v-for="(i) in sceneData" :key="i">
                    <template v-slot="slotProps">
                        <div class="overlay-content d-flex flex-column align-items-center" @click="showItem(i)">
                            <div class="sceneIcon"></div>
                            {{i.ScenicSpotName}}
                            <span style="display:none">{{slotProps}}</span>
                        </div>
                    </template>
                </ol-overlay>
            </div>
            <!-- 附近旅宿位置 -->
            <div v-if="hotel">
                <ol-overlay :position="[i.Position.PositionLon,i.Position.PositionLat]" v-for="(i) in hotelData" :key="i">
                    <template v-slot="slotProps">
                        <div class="overlay-content d-flex flex-column align-items-center" @click="showItem(i)">
                            <div class="hotelIcon"></div>
                            {{i.HotelName}}
                            <span style="display:none">{{slotProps}}</span>
                        </div>
                    </template>
                </ol-overlay>
            </div>
            <!-- 附近活動位置 -->
            <div v-if="activity">
                 <ol-overlay :position="[i.Position.PositionLon,i.Position.PositionLat]" v-for="(i) in activityData" :key="i">
                    <template v-slot="slotProps">
                        <div class="overlay-content d-flex flex-column align-items-center" @click="showItem(i)">
                            <div class="activityIcon"></div>
                            {{i.ActivityName}}
                            <span style="display:none">{{slotProps}}</span>
                        </div>
                    </template>
                </ol-overlay>
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
            return store.state.NearbyBar.center
        })
        const userMark = { //圖標
            radius:10,
            scale:2
        }
        //使用者篩選種類
        const scene = computed(()=>{
            return store.state.NearbyBar.scene
        })
        const hotel = computed(()=>{
            return store.state.NearbyBar.hotel
        })
        const food = computed(()=>{
            return store.state.NearbyBar.food
        })
        const activity = computed(()=>{
            return store.state.NearbyBar.activity
        })
        //各種種類data
        const sceneData = computed(()=>{
            return store.state.NearbyBar.sceneData
        })
        const foodData = computed(()=>{
            return store.state.NearbyBar.foodData
        })
        const hotelData = computed(()=>{
            return store.state.NearbyBar.hotelData
        })
        const activityData = computed(()=>{
            return store.state.NearbyBar.activityData
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
            store.commit('NearbyBar/setShowItem',itemData)
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