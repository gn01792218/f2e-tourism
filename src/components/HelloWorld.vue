<template>
      {{Scene}}
        <!-- 基隆活動
        {{active}}
        {{location}} -->
        <div class="d-md-flex flex-md-wrap">
           <SceneCardItem class="me-md-5"
          v-for="(item,index) in data" :key="index"
          :imgSrc="item.Picture?.PictureUrl1"
          :imgAlt="item.picture?.PictureDescription1"
          :title="item.Name"
          :description="item.DescriptionDetail"
          :openTime="item.OpenTime"
        />
        </div>
        <button @click="getTinan">取得台南</button>
        <button @click="getTaipai">取得台北</button>
      <Loading v-if="isloading"/>
</template>

<script lang="ts">
import { computed, defineComponent,ref, watch } from 'vue';
import {getTourismDataByCity,getRestaurantByCity,getAllHotel,getHotelByCity,getAllActivity,getActivityByCity} from '../api'
import SceneCardItem from '@/components/card/SceneCardItem.vue'
import Loading from './Loading.vue'
import {useStore} from 'vuex'
import  {City,CardCategory}  from '@/types/enum';
import {SceneCard} from '@/types/CardFactory'
export default defineComponent({
  components:{
    Loading,SceneCardItem
  },
  props: {
    msg: String,
  },
  setup(){
    function getSceneList () {
      store.commit('Scene/loadAllScene')
      
    }
    //vuex的使用測試
    const store = useStore()
    // store.commit('Scene/loadAllScene')
    // store.commit('Hotel/loadAllHotel')
    // store.commit('Food/loadAllFood')
    // store.commit('Activity/loadAllActivity')
    function getTinan (){
      store.commit('Scene/loadSceneByCity',City.Tainan)
      store.commit('Hotel/loadHotelByCity',City.Tainan)
      store.commit('Food/loadFoodByCity',City.Tainan)
      store.commit('Activity/loadActivityByCity',City.Tainan)
    }
    function getTaipai () {
      store.commit('Scene/loadSceneByCity',City.Taipei)
      store.commit('Hotel/loadHotelByCity',City.Taipei)
      store.commit('Food/loadFoodByCity',City.Taipei)
      store.commit('Activity/loadActivityByCity',City.Taipei)
    }
    
    const Scene = computed(()=>{
      return store.state.Scene.sceneByCity
    })
    watch(Scene,()=>{

    })
    const isloading = ref(true)
    const data = ref<any>({})
    const location = ref({})
    const eat = ref({})
    const hotel = ref({})
    const active = ref({})
    getAllHotel()?.then((r:any)=>{
      hotel.value = r.data
      console.log(r.data)
    })
    // getAllActivity(12)?.then((r=>{
    //   active.value = r.data
    //   console.log(r.data)
    // }))
    // getActivityByCity(City.LienchiangCounty)?.then((r:any)=>{
    //   active.value = r.data
    //   console.log(r.data)
    // })
    // getRestaurantByCity(City.NantouCounty)?.then((r:any)=>{
    //   eat.value = r.data
    // })
    // getHotelByCity(City.Keelung,10)?.then((r:any)=>{
    //   hotel.value = r.data
    //   console.log(r.data)
    // })
    // getTourismDataByCity(City.NewTaipei,10)?.then((r:any)=>{
    //   data.value =r.data
    //   console.log(r.data)
    //   location.value =r.data[0].Position
    //   isloading.value = false
    // })
    return{ 
      data,location,isloading,eat,hotel,active,Scene,

      //methods
      getTinan,getTaipai
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
