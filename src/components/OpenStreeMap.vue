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
        const userMark = {
            radius:20,
            scale:2
        }
        //地圖view基本設置
        const projection = ref('EPSG:4326')
        const zoom = ref(12)
        const rotation = ref(0)
        const radius = ref(10)
        const strokeWidth = ref(5)
        const strokeColor = ref('red')
        const fillColor = ref('white')
        const fullscreencontrol= ref(true)
        return{
            //data
            myLocation,
            userMark,
            projection,
            zoom,
            rotation,
            radius,
            strokeWidth,
            strokeColor,
            fillColor,
            fullscreencontrol,
        }
    }
})
</script>