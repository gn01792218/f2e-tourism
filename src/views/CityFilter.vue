<template>
 <h1>{{ cityChinesName }}{{cardCategory}}</h1>
 <button @click="toCity(0)">全台</button>
 <button @click="toCity(20)">金門</button>
  <button @click="toCity(22)">連江</button>
  <button @click="toCity(21)">澎湖</button>
  <div id="map" class="mapContainer">
          <svg id="svg" class="sv" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"></svg>
  </div>
  <CityRecommend 
    v-if="showRecommend" 
  />
</template>
<script lang="ts">
import {defineComponent,computed, ref, onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {City} from '../types/enum'
import CityRecommend from './CityRecommend.vue'
import d3 from '@/types/d3.min'
export default defineComponent({
    components:{
        CityRecommend,
    },
    setup(){
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const cityChinesName =ref("")
        const city = ref("")
        onMounted(()=>{
            test()
        })
        async function test () {
        const map = document.querySelector('#map') as HTMLElement
        const width = Number(map?.offsetWidth.toFixed())
        const height = Number(map?.offsetHeight.toFixed())
        let mercatorScale,w=window.screen.width
        //使用以下來縮小地圖
        if(w > 1366) { mercatorScale =5000}   
            else if(w <= 1366 && w >480 ) {mercatorScale = 9000}
            else {mercatorScale = 6000 }
        const path =await d3.geo.path().projection(
                d3
                .geo
                .mercator()
                .center([121,24])
                .scale(mercatorScale)
                .translate([width/2,height/2.5])
        )
        const svg = await d3.select('#svg').attr('width',width).attr('height',height).attr('viewBox',`0 0 ${width} ${height}`)
        d3.json("/taiwan.json",(error:any,geometry:any)=>{
            if (error) throw error
            svg.selectAll('path').data(geometry.features).enter().append('path').attr('d',path).attr({
                id: (d:any)=>`city${d.properties.COUNTYCODE}`   //設id用來之後動態添加class用
            })
            .on('click',(d:any) => {
                cityChinesName.value= d.properties.COUNTYNAME.split(" ")[0]; // 換中文名
                city.value= d.properties.COUNTYENG.split(" ")[0]; // 換英文名
                store.commit('switchCity',city.value)
                if(document.querySelector('.active')){
                    document.querySelector('.active')?.classList.remove('active')
                }
                document.getElementById(`city${d.properties.COUNTYCODE}`)?.classList.add('active')
            })
            .on('mouseover',(d:any)=>{
                document.getElementById(`city${d.properties.COUNTYCODE}`)?.classList.add('hover')
            })
            .on('mouseout',(d:any)=>{
                if(document.querySelector('.hover')){
                    document.querySelector('.hover')?.classList.remove('hover')
                }
            })
        })
        return svg
        }
        const cardCategory = computed(()=>{
            return route.params.category
        })
        const showRecommend = ref(true)   //點選城市的時候出現，預設推薦的所有景點、餐飲、旅宿、活動；只有點選篩選按鈕時才消失?(或不要消失)
        //選城市之後，直接呈現預設的靜態頁面
        function toCity (cityNum:number) {
            store.commit('switchCity',City[cityNum])
            switch(cityNum){
                case 0 :
                    cityChinesName.value = '臺灣'
                    break
                case 20:
                    cityChinesName.value = '金門縣'
                    break
                case 21:
                    cityChinesName.value = '澎湖縣'
                    break
                case 22:
                    cityChinesName.value = '連江縣'
                    break
            }
        }
        return{
            //data
            cardCategory,showRecommend,cityChinesName,city,
            //methods
            toCity,
        }
    }
})
</script>
<style lang="scss">
    .sv{
        height:350px;  
        background-color: yellow;
        fill:yellowgreen;
        stroke: white;
    }
    .active{
      fill: red;
    }
    .hover{
        fill: burlywood;
        cursor: pointer;
    }
</style>