<template>
    <div class="collectionTag d-flex">
        <button @click="currentTag='景點'">景點</button>
        <button @click="currentTag='旅宿'">旅宿</button>
        <button @click="currentTag='餐飲'">餐飲</button>
        <button @click="currentTag='活動'">活動</button>
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='景點'">
        <SceneCardItem 
            v-for="(scene,index) in SceneDataList" :key="index"
            :sceneData="scene"
        />
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='旅宿'">
        <HotelCardItem 
            v-for="(hotel,index) in HotelDataList" :key="index"
            :hotelData="hotel"
        />
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='餐飲'">
        <FoodCardItem 
            v-for="(food,index) in FoodDataList" :key="index"
            :foodData="food"
        />
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='活動'">
        <ActivityCardItem 
            v-for="(active,index) in ActivityDataList" :key="index"
            :activityData="active"
        />
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import SceneCardItem from '@/components/SceneCardItem.vue'
import HotelCardItem from '@/components/HotelCardItem.vue'
import FoodCardItem from '@/components/FoodCardItem.vue'
import ActivityCardItem from '@/components/ActivityCardItem.vue'
export default defineComponent({
    components:{
        SceneCardItem,HotelCardItem,FoodCardItem,ActivityCardItem,
    },
    setup(){
        const localStorage = window.localStorage
        const currentTag = ref("餐飲")
        const sceneList = computed(()=>{ //清單陣列
            return localStorage.getItem('sceneCollectList')?.split('#')
        })
        const hotelList = computed(()=>{ //清單陣列
            return localStorage.getItem('hotelCollectList')?.split('#')
        })
        const foodList = computed(()=>{ //清單陣列
            return localStorage.getItem('foodCollectList')?.split('#')
        })
        const activityList = computed(()=>{ //清單陣列
            return localStorage.getItem('activityCollectList')?.split('#')
        })
        const SceneDataList = reactive<Array<Object>>([])
        const HotelDataList = reactive<Array<Object>>([])
        const FoodDataList = reactive<Array<Object>>([])
        const ActivityDataList = reactive<Array<Object>>([])
        async function getSceneData () {
            //根據收藏清單，得到對應的物件
            await sceneList.value?.map(async(i)=>{
                if(i!==""){
                    await SceneDataList.push(JSON.parse(localStorage.getItem(i) as string)) 
                }
            })
        }
        async function getHotelData () {
            //根據收藏清單，得到對應的物件
            await hotelList.value?.map(async(i)=>{
                if(i!==""){
                    await HotelDataList.push(JSON.parse(localStorage.getItem(i) as string)) 
                }
            })
        }
        async function getFoodData () {
            //根據收藏清單，得到對應的物件
            await foodList.value?.map(async(i)=>{
                if(i!==""){
                    await FoodDataList.push(JSON.parse(localStorage.getItem(i) as string)) 
                }
            })
        }
        async function getActivityData () {
            //根據收藏清單，得到對應的物件
            await activityList.value?.map(async(i)=>{
                if(i!==""){
                    await ActivityDataList.push(JSON.parse(localStorage.getItem(i) as string)) 
                }
            })
        }
        onMounted(()=>{
             getSceneData()
             getHotelData()
             getFoodData()
             getActivityData()
        })
        return{
            //data
            currentTag,SceneDataList,HotelDataList,FoodDataList,ActivityDataList
        }
    }
})
</script>