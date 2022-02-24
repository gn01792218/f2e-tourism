<template>
<!-- Modal -->
    <div class="wheretoGO"> 
        <div class="modal fade" id="whereAreYouGoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header d-flex align-items-center">
                        <div class="bigAdventureIcon"></div>
                        <h5 class="modal-title wheretoGo-title" id="exampleModalLabel">大冒險:請問，你要去哪裡?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body ">
                    <Loading class="position-absolute" v-if="loading"/>
                    <header class='itemName'>
                        <h1 v-show="recommendData.RestaurantName">{{recommendData.RestaurantName}}</h1>
                        <h1 v-show="recommendData.ScenicSpotName">{{recommendData.ScenicSpotName}}</h1>
                        <h1 v-show="recommendData.HotelName">{{recommendData.HotelName}}</h1>
                        <h1 v-show="recommendData.ActivityName">{{recommendData.ActivityName}}</h1>
                    </header>
                    <p>{{recommendData.DescriptionDetail}}</p>
                    <p class="subTitle2-font">{{recommendData.Description}}</p>
                    <p v-if="!recommendData.DescriptionDetail && !recommendData.Description">作者很神秘，沒任何打字...</p>
                    <div class="d-flex">
                        <div class="locationIcon"></div>
                        <p>{{recommendData.City}}</p>
                    </div>
                        <img v-if="recommendData.Picture" :src="recommendData.Picture.PictureUrl1" :alt="recommendData.Picture.PictureDescription1">
                        <img v-else :src='defaultPicture' alt="作者無提供照片">
                </div>
                <div class="modal-footer d-flex justify-content-around">
                    <div>
                        <div class="randomIcon" @click="randomRecommend"></div>
                        <p>再骰一次</p>
                    </div>
                    <div>
                        <div class="bigAdventureIcon" data-bs-dismiss="modal" @click="gotItemPage(recommendData)"></div>
                        <p>前往查看</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import Loading from '@/components/Loading.vue'
import SceneCardItem from '@/components/card/SceneCardItem.vue'
import HotelCardItem from '@/components/card/HotelCardItem.vue'
import ActivityCardItem from '@/components/card/ActivityCardItem.vue'
import FoodCardItem from '@/components/card/FoodCardItem.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
//1.可以隨機亂骰
//2.也可以選擇城市來骰
export default defineComponent({
    components:{
        Loading,SceneCardItem,HotelCardItem,ActivityCardItem,FoodCardItem,
    },
    setup(){
        const store = useStore()
        const router = useRouter()
        const loading = ref(false)
        const defaultPicture = require('../assets/images/icon.webp')
        const recommendData = computed(()=>{
            loading.value = false  //剛開始時不需要讓人家看到loading
            return store.state.RandomItem.randomItem
        })
        watch(recommendData,()=>{
            console.log("得到的資料",recommendData.value)
        })
        onMounted(()=>{
            randomRecommend ()
        })
        // function randomNum (min:number,max:number):number {
        //     return Math.round(((Math.random()*(max-min)+min)))
        // }
        function randomRecommend () {
            loading.value = true
            store.dispatch('RandomItem/getRandomItem').then()
        }
        function gotItemPage (data:any) {
            let temp = JSON.stringify(data)
            router.push({
            path:`/ItemDisplay`,
            query:{
                data:temp
            }
            })
        }
        return{
            //data
            recommendData,defaultPicture,
            //methods
             randomRecommend,loading,gotItemPage,
        }
    }
})
</script>
<style scoped>
    .wheretoGO{
        position: relative;
    }
</style>