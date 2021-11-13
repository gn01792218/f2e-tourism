<template>
    <div class="collectionTag d-flex">
        <button @click="currentTag='景點'">景點</button>
        <button @click="currentTag='旅宿'">旅宿</button>
        <button @click="currentTag='餐飲'">餐飲</button>
        <button @click="currentTag='活動'">活動</button>
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='景點'">
        <DrageItem
            v-for="(scene,index) in SceneDataList" :key="index"
            :data="scene"
            category='景點'
        />
        <!-- <SceneCardItem 
            v-for="(scene,index) in SceneDataList" :key="index"
            :sceneData="scene"
        /> -->
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='旅宿'">
        <DrageItem
            v-for="(hotel,index) in HotelDataList" :key="index"
            :data="hotel"
            category='旅宿'
        />
        <!-- <HotelCardItem 
            v-for="(hotel,index) in HotelDataList" :key="index"
            :hotelData="hotel"
        /> -->
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='餐飲'">
        <DrageItem
            v-for="(food,index) in FoodDataList" :key="index"
            :foodData="food"
            category="餐飲"
        />

        <!-- <FoodCardItem 
            v-for="(food,index) in FoodDataList" :key="index"
            :foodData="food"
        /> -->
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='活動'">
        <DrageItem
            v-for="(active,index) in ActivityDataList" :key="index"
            :activityData="active"
            category="活動"
        />
        <!-- <ActivityCardItem 
            v-for="(active,index) in ActivityDataList" :key="index"
            :activityData="active"
        /> -->
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import DrageItem from '@/components/DrageItem.vue'
import SceneCardItem from '@/components/card/SceneCardItem.vue'
import HotelCardItem from '@/components/card/HotelCardItem.vue'
import FoodCardItem from '@/components/card/FoodCardItem.vue'
import ActivityCardItem from '@/components/card/ActivityCardItem.vue'
import store from '@/store'
import { useStore } from 'vuex'
export default defineComponent({
    components:{
        SceneCardItem,HotelCardItem,FoodCardItem,ActivityCardItem,DrageItem,
    },
    setup(){
        const store = useStore()
        store.commit('MyCollection/getFoodList')
        store.commit('MyCollection/getActivityList')
        store.commit('MyCollection/getSceneList')
        store.commit('MyCollection/getHotelList')
        onMounted(()=>{
            
        })
        
        const currentTag = ref("景點")
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
        return{
            //data
            currentTag,SceneDataList,HotelDataList,FoodDataList,ActivityDataList
        }
    }
})
</script>