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
import store from '@/store'
export default defineComponent({
    components:{
        SceneCardItem,HotelCardItem,FoodCardItem,ActivityCardItem,
    },
    setup(){
        const currentTag = ref("餐飲")
        const SceneDataList = computed(()=>{
            return store.state.MyCollection.sceneList
        })
        const HotelDataList = computed(()=>{
            return store.state.MyCollection.hotelList
        })
        const FoodDataList = computed(()=>{
            return store.state.MyCollection.foodList
        })
        const ActivityDataList = computed(()=>{
            return store.state.MyCollection.activityList
        })
        onMounted(()=>{
            store.commit('MyCollection/getSceneList')
            //  getSceneData()
             store.commit('MyCollection/getHotelList')
             store.commit('MyCollection/getFoodList')
             store.commit('MyCollection/getActivityList')
        })
        return{
            //data
            currentTag,SceneDataList,HotelDataList,FoodDataList,ActivityDataList
        }
    }
})
</script>