<template>
  <!-- 變更搜尋半徑 -->
  <div class="search-container mb-3">
    <div class="searchNearby input-group input-group-sm m-3">
      <div class="searchIcon me-3" @click="reSearchNearby"></div>
      <input
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        placeholder="以公尺為單位輸入搜尋的範圍,ex:1000"
        @keypress="reSearchNearby"
        v-model="nearbyDistance"
      />
    </div>
  </div>
  <!-- nearbyBar -->
  <div class="nearbyContainer">
    <ul class="diplayTab nav nav-tabs">
      <li class="nav-item">
        <a
          :class="['nav-link', { active: currentNearByTag == '美食' }]"
          @click="currentNearByTag = '美食'"
          ><div class="foodIcon mb-3"></div>
          周邊美食</a
        >
      </li>
      <li class="nav-item">
        <a
          :class="['nav-link', { active: currentNearByTag == '活動' }]"
          @click="currentNearByTag = '活動'"
          ><div class="activityIcon mb-3"></div>
          周邊活動</a
        >
      </li>
      <li class="nav-item">
        <a
          :class="['nav-link', { active: currentNearByTag == '景點' }]"
          @click="currentNearByTag = '景點'"
          ><div class="sceneIcon mb-3"></div>
          周邊景點</a
        >
      </li>
      <li class="nav-item">
        <a
          :class="['nav-link', { active: currentNearByTag == '旅宿' }]"
          @click="currentNearByTag = '旅宿'"
          ><div class="hotelIcon mb-3"></div>
          周邊旅宿</a
        >
      </li>
    </ul>
    <div
      v-if="currentNearByTag == '美食'"
      class="nearbyContainer nearbyContainer-content mb-3 d-flex p-3"
    >
      <h3 class="nearbyType title-font">周邊美食</h3>
      <div class="nearByBox">
        <div v-if="nearbyFood.length == 0">方圓裡查詢不到資料...</div>
        <DrageItem
          v-for="(i, index) in nearbyFood"
          :key="index"
          :data="i"
          category="美食"
        />
      </div>
    </div>
    <div
      v-if="currentNearByTag == '活動'"
      class="nearbyContainer nearbyContainer-content mb-3 d-flex p-3"
    >
      <h3 class="nearbyType title-font">周邊活動</h3>
      <div class="nearByBox">
        <div v-if="nearbyActivity.length == 0">方圓裡查詢不到資料...</div>
        <DrageItem
          v-for="(i, index) in nearbyActivity"
          :key="index"
          :data="i"
          category="活動"
        />
      </div>
    </div>
    <div
      v-if="currentNearByTag == '景點'"
      class="nearbyContainer nearbyContainer-content mb-3 d-flex p-3"
    >
      <h3 class="nearbyType title-font">周邊景點</h3>
      <div v-if="nearbyScene.length == 0">方圓裡查詢不到資料...</div>
      <div class="nearByBox">
        <DrageItem
          v-for="(i, index) in nearbyScene"
          :key="index"
          :data="i"
          category="景點"
        />
      </div>
    </div>
    <div
      v-if="currentNearByTag == '旅宿'"
      class="nearbyContainer nearbyContainer-content mb-3 d-flex p-3"
    >
      <h3 class="nearbyType title-font">周邊旅宿</h3>
      <div v-if="nearbyHotel.length == 0">方圓裡查詢不到資料...</div>
      <div class="nearByBox">
        <DrageItem
          v-for="(i, index) in nearbyHotel"
          :key="index"
          :data="i"
          category="旅宿"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch, ref } from "vue";
import {
  getSceneNearby,
  getFoodNearby,
  getHotelNearby,
  getActivityNearby,
} from "../api";
import { useStore } from "vuex";
import DrageItem from "@/components/card/DrageItem.vue";
export default defineComponent({
  components: {
    DrageItem,
  },
  setup() {
    const store = useStore();
    const center = computed(() => {
      return store.state.NearbyBar.center;
    });
    watch(center, () => {
      showNearby(nearbyDistance.value); //中心點資料一改變，就抓取搜邊資料
    });
    //搜尋範圍
    const nearbyDistance = ref(1000);
    //nearbyBar
    const currentNearByTag = ref("景點");
    const nearbyScene = computed(() => {
      return store.state.MyNearby.sceneData;
    });
    const nearbyFood = computed(() => {
      return store.state.MyNearby.foodData;
    });
    const nearbyActivity = computed(() => {
      return store.state.MyNearby.activityData;
    });
    const nearbyHotel = computed(() => {
      return store.state.MyNearby.hotelData;
    });
    function showNearby(searchDistance: number) {
      getSceneNearby(center.value[1], center.value[0], searchDistance)?.then(
        (res) => {
          store.commit("MyNearby/setSceneData", res.data);
          console.log(nearbyScene.value);
        }
      );
      getActivityNearby(center.value[1], center.value[0], searchDistance)?.then(
        (res) => {
          store.commit("MyNearby/setActivityData", res.data);
          console.log(nearbyActivity.value);
        }
      );

      getFoodNearby(center.value[1], center.value[0], searchDistance)?.then(
        (res) => {
          store.commit("MyNearby/setFoodData", res.data);
          console.log(nearbyFood.value);
        }
      );

      getHotelNearby(center.value[1], center.value[0], searchDistance)?.then(
        (res) => {
          store.commit("MyNearby/setHotelData", res.data);
          console.log(nearbyHotel.value);
        }
      );
    }
    function reSearchNearby() {
      showNearby(nearbyDistance.value); //請求周邊資料
    }
    return {
      //data
      currentNearByTag,
      nearbyScene,
      nearbyFood,
      nearbyActivity,
      nearbyHotel,
      nearbyDistance,
      //methods
      reSearchNearby,
    };
  },
});
</script>
