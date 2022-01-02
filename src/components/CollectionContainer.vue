<template>
    <div class="collectionTag d-flex">
         <ul class="diplayTab nav nav-tabs">
                <li class="nav-item">
                    <a :class="['nav-link',{'active':currentTag=='美食'}]" @click="currentTag='餐飲'"><div class="foodIcon"></div>收藏美食</a>
                </li>
                <li class="nav-item">
                    <a :class="['nav-link',{'active':currentTag=='活動'}]" @click="currentTag='活動'"><div class="activityIcon"></div>收藏活動</a>
                </li>
                <li class="nav-item">
                    <a :class="['nav-link',{'active':currentTag=='景點'}]" @click="currentTag='景點'"><div class="sceneIcon"></div>收藏景點</a>
                </li>
                <li class="nav-item">
                    
                    <a :class="['nav-link',{'active':currentTag=='旅宿'}]" @click="currentTag='旅宿'"><div class="hotelIcon"></div>收藏旅宿</a>
                </li>
        </ul>
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='景點'">
        <DrageItem
            v-for="(scene,index) in SceneDataList" :key="index"
            :data="scene"
            category='景點'
        />
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='旅宿'">
        <DrageItem
            v-for="(hotel,index) in HotelDataList" :key="index"
            :data="hotel"
            category='旅宿'
        />
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='餐飲'">
        <DrageItem
            v-for="(food,index) in FoodDataList" :key="index"
            :data="food"
            category="餐飲"
        />
    </div>
    <div class="d-flex flex-wrap" v-if="currentTag=='活動'">
        <DrageItem
            v-for="(active,index) in ActivityDataList" :key="index"
            :data="active"
            category="活動"
        />
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import DrageItem from '@/components/card/DrageItem.vue'
import { useStore } from 'vuex'
export default defineComponent({
    components:{
        DrageItem,
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