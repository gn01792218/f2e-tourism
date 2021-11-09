<template>
<!-- Modal -->
    <div class="wheretoGO"> 
        <Loading class="position-absolute" v-if="loading"/>
        <div class="modal fade" id="whereAreYouGoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">大冒險:請問，你要去哪裡?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body ">
                   <!-- {{hotelNearby}}  -->
       <!-- {{foodNearby}} -->
        {{activityNearby}}
                <!-- <div class="d-flex">
                    <SceneCardItem
                    v-for="(scene,index) in sceneNearby" :key="index"
                    :sceneData="scene"
                />
                </div> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click=" randomRecommend">骰骰子</button>
                </div>
                </div>
            </div>
        </div>
        
    </div>

      
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import Loading from '@/components/Loading.vue'
import SceneCardItem from '@/components/SceneCardItem.vue'
import {City,CardCategory} from '../types/enum'
import {getSceneNearby,getFoodNearby,getHotelNearby,getActivityNearby,getRandomHotelByCity,getRandomActivityByCity,getRandomSceneByCity,getRandomFoodByCity} from '../api'
//1.可以隨機亂骰
//2.也可以選擇城市來骰
export default defineComponent({
    components:{
        Loading,SceneCardItem,
    },
    setup(){
        let categoryNum = ref()
        let cityNum = ref()
        const loading = ref(false)
        const recommendData = ref()
        const sceneNearby = ref()
        const hotelNearby = ref()
        const foodNearby = ref()
        const activityNearby = ref()
        onMounted(()=>{
            randomRecommend()
            loading.value = false  //剛開始時不需要讓人家看到loading
        })
        watch(recommendData,()=>{
            getSceneNearby(recommendData.value.Position.PositionLat,recommendData.value.Position.PositionLon,1000)?.
            then(res=>{
                    sceneNearby.value = res.data
            })
            getFoodNearby(recommendData.value.Position.PositionLat,recommendData.value.Position.PositionLon,1000)?.
            then(res=>{
                    foodNearby.value = res.data
            })
            getHotelNearby(recommendData.value.Position.PositionLat,recommendData.value.Position.PositionLon,1000)?.
            then(res=>{
                    hotelNearby.value = res.data
            })
            getActivityNearby(recommendData.value.Position.PositionLat,recommendData.value.Position.PositionLon,1000)?.
            then(res=>{
                    activityNearby.value = res.data
            })
        })
        function randomNum (min:number,max:number):number {
            return Math.round(((Math.random()*(max-min)+min)))
        }
        function randomRecommend () {
            loading.value = true
            categoryNum.value = randomNum(0,3)
            cityNum.value = randomNum(0,22)
             switch(categoryNum.value){
               case 0:
                    getRandomHotelByCity(City[cityNum.value])?.then(res=>{
                    recommendData.value = res.data[randomNum(0,res.data.length)]
                    loading.value = false
                    })
                    break
                case 1: //activity
                 console.log("進01")
                    getRandomActivityByCity(City[cityNum.value])?.then(res=>{
                    recommendData.value = res.data[randomNum(0,res.data.length)]
                    loading.value = false
                    })
                    break
                case 2: //Scene
                console.log("進02")
                    getRandomSceneByCity(City[cityNum.value])?.then(res=>{
                    recommendData.value = res.data[randomNum(0,res.data.length)]
                    loading.value = false
                    })
                    break
                case 3: //Food
                console.log("進03")
                    getRandomFoodByCity(City[cityNum.value])?.then(res=>{
                    recommendData.value = res.data[randomNum(0,res.data.length)]
                    loading.value = false
                    })
                    break
           }
        }
        return{
            //methods
             randomRecommend, recommendData,loading,sceneNearby,hotelNearby,foodNearby,activityNearby,
        }
    }
})
</script>
<style scoped>
    .wheretoGO{
        position: relative;
    }
</style>