<template>
  <div class="home">
    <!-- <header class="home-header">
      <h1 class="title-font">大冒險:請問，你要去哪裡?</h1>
    </header> -->
    <div class="home-containter">
      <div class="hotScene">
        <div class="card-bg"></div>
        <h3 class="title-font m-3">熱門景點</h3>
        <span class="decorateLine"></span>
        <SceneCardItem
          v-for="(scene, index) in hotScene"
          :key="index"
          :sceneData="scene"
        />
      </div>
      <div class="hotActivity">
        <h3 class="title-font m-3">熱門活動</h3>
        <span class="decorateLine"></span>
        <ActivityCardItem
          v-for="(activity, index) in hotActivity"
          :key="index"
          :activityData="activity"
        />
      </div>
      <div class="hotFood">
        <h3 class="title-font m-3">熱門食物</h3>
        <span class="decorateLine"></span>
        <FoodCardItem
          v-for="(food, index) in hotFood"
          :key="index"
          :foodData="food"
        />
      </div>
      <div class="hotHtel m-3">
        <h3 class="title-font">熱門旅宿</h3>
        <span class="decorateLine"></span>
        <HotelCardItem
          v-for="(hotel, index) in hotHotel"
          :key="index"
          :hotelData="hotel"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import SceneCardItem from "@/components/card/SceneCardItem.vue";
import ActivityCardItem from "@/components/card/ActivityCardItem.vue";
import FoodCardItem from "@/components/card/FoodCardItem.vue";
import HotelCardItem from "@/components/card/HotelCardItem.vue";
export default defineComponent({
  components: {
    SceneCardItem,
    ActivityCardItem,
    FoodCardItem,
    HotelCardItem,
  },
  setup() {
    //用來清理LocalStorage資料的
    // onMounted(()=>{
    //   window.localStorage.clear()
    // })
    //這裡就先發出請求ALL的資料
    const store = useStore();
    store.commit("Scene/loadHotScene");
    store.commit("Hotel/loadHotHotel");
    store.commit("Food/loadHotFood");
    store.commit("Activity/loadHotActivity");
    //data
    const hotScene = computed(() => {
      return store.state.Scene.hotScene;
    });
    const hotHotel = computed(() => {
      return store.state.Hotel.hotHotel;
    });
    const hotFood = computed(() => {
      return store.state.Food.hotFood;
    });
    const hotActivity = computed(() => {
      return store.state.Activity.hotActivity;
    });
    return {
      //data
      hotScene,
      hotHotel,
      hotFood,
      hotActivity,
    };
  },
});
</script>
<style scoped lang="scss">
</style>