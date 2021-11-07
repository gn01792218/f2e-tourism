<template>
 <h1>{{cardCategory}}篩選頁面</h1>
 <button @click="toCity(0)">全台</button>
 <button @click="toCity(1)">台北市</button>
  <button @click="toCity(4)">台中市</button>
  <button @click="toCity(5)">台南市</button>
  <CityRecommend 
    v-if="showRecommend" 
  />
</template>

<script lang="ts">
import {defineComponent,computed, ref, watch} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import { useStore } from 'vuex'
import {City} from '../types/enum'
import CityRecommend from './CityRecommend.vue'
export default defineComponent({
    components:{
        CityRecommend,
    },
    setup(){
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const cardCategory = computed(()=>{
            return route.params.category
        })
        const showRecommend = ref(true)   //點選城市的時候出現，預設推薦的所有景點、餐飲、旅宿、活動；只有點選篩選按鈕時才消失?(或不要消失)
        //選城市之後，直接呈現預設的靜態頁面

        function toCity (cityNum:number) {
            store.commit('switchCity',City[cityNum])
            // router.push(`/CategoryFilter/${City[cityNum]}&${cardCategory.value}`)
        }
        return{
            //data
            cardCategory,showRecommend,
            //methods
            toCity,
        }
    }
})
</script>