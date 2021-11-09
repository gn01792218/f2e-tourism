<template>
  <div class="home">
   <div class="hotScene">
     <p>熱門景點</p>
     <span class="decorateLine"></span>
      <SceneCardItem 
        v-for="(scene,index) in hotScene" :key="index"
        :sceneData="scene"
      />
   </div>
   <div class="hotActivity">
     <p>熱門活動</p>
     <span class="decorateLine"></span>
     {{hotActivity}}
   </div>
   <div  class="hotFood">
     <p>熱門食物</p>
     <span class="decorateLine"></span>
     {{hotFood}}
   </div>
   <div class="hotHtel">
     <p>熱門旅宿</p>
     <span class="decorateLine"></span>
     {{hotHotel}}
   </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted} from 'vue';
import { useStore } from 'vuex';
import SceneCardItem from '../components/SceneCardItem.vue'
import gsap from 'gsap'
export default defineComponent({
  components: {
    SceneCardItem,
  },
  setup(){
    onMounted(()=>{  //測試gsap效果
    //   gsap.to('.hotFood',{
    //   duration:1,
    //   y:-1000,
    // })
    
    })
    //這裡就先發出請求ALL的資料
    const store = useStore()
    store.commit('Scene/loadHotScene')
    store.commit('Hotel/loadHotHotel')
    store.commit('Food/loadHotFood')
    store.commit('Activity/loadHotActivity')
    //data
    const hotScene = computed(()=>{
      return store.state.Scene.hotScene
    })
    const hotHotel = computed(()=>{
      return store.state.Hotel.hotHotel
    })
    const hotFood = computed(()=>{
      return store.state.Food.hotFood
    })
    const hotActivity = computed(()=>{
      return store.state.Activity.hotActivity
    })
    return {
      //data
      hotScene,hotHotel,hotFood,hotActivity,
    }
  }
});
</script>
<style scoped lang="scss">

</style>