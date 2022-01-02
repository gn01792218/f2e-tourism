<template>
    <div class="cityFilter">
        <header class="cityFilter-header">
            <h1 class="title-font">{{ cityChinesName }}{{cardCategory}}</h1>
        </header>  
        <div class="cityFilter-content">
            <TaiwanMap/>
            <CitySelecterBar/>
            <CityRecommend 
            v-if="showRecommend" 
            />
        </div> 
    </div>
</template>
<script lang="ts">
import {defineComponent,computed, ref,watch} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import CityRecommend from './CityRecommend.vue'
import TaiwanMap from '@/components/TaiwanMap.vue'
import CitySelecterBar from '@/components/CitySelecterBar.vue'
export default defineComponent({
    components:{
        CityRecommend,
        TaiwanMap,
        CitySelecterBar,
    },
    setup(){
        const store = useStore()
        const route = useRoute()
        const cityChinesName =computed(()=>{
            return store.state.currentCityChinessName
        })
        watch(cityChinesName,()=>{
            console.log(cityChinesName.value)
        })
        const cardCategory = computed(()=>{
            return route.params.category
        })
        const showRecommend = ref(true)   //點選城市的時候出現，預設推薦的所有景點、餐飲、旅宿、活動；只有點選篩選按鈕時才消失?(或不要消失)

        return{
            //data
            cardCategory,showRecommend,cityChinesName,
            //methods
            
        }
    }
})
</script>