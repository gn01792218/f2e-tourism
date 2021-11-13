<template>
 <h1>{{ cityChinesName }}{{cardCategory}}</h1>
 <button @click="toCity(0)">全台</button>
 <button @click="toCity(20)">金門</button>
  <button @click="toCity(22)">連江</button>
  <button @click="toCity(21)">澎湖</button>
  <TaiwanMap/>
  <CityRecommend 
    v-if="showRecommend" 
  />
</template>
<script lang="ts">
import {defineComponent,computed, ref,watch} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {City} from '../types/enum'
import CityRecommend from './CityRecommend.vue'
import TaiwanMap from '@/components/TaiwanMap.vue'
// import d3 from '@/types/d3.min'
export default defineComponent({
    components:{
        CityRecommend,TaiwanMap,
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
        //選城市之後，直接呈現預設的靜態頁面
        function toCity (cityNum:number) {
            store.commit('switchCity',City[cityNum])
            switch(cityNum){
                case 0 :
                    store.commit('switchCityChinese',"臺灣") 
                    break
                case 20:
                     store.commit('switchCityChinese',"金門縣") 
                    break
                case 21:
                     store.commit('switchCityChinese',"澎湖縣") 
                    break
                case 22:
                     store.commit('switchCityChinese',"連江縣") 
                    break
            }
        }
        return{
            //data
            cardCategory,showRecommend,cityChinesName,
            //methods
            toCity,
        }
    }
})
</script>