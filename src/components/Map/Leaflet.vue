<template>
  <div id="leafletMap" class="L-map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch } from "vue";
import L, { LayerGroup } from "leaflet";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const myLocation = computed(() => {
      return store.state.MyNearby.userLocation;
    });
    //使用者篩選種類
    const scene = computed(() => {
      return store.state.MyNearby.scene;
    });
    const hotel = computed(() => {
      return store.state.MyNearby.hotel;
    });
    const food = computed(() => {
      return store.state.MyNearby.food;
    });
    const activity = computed(() => {
      return store.state.MyNearby.activity;
    });
    //各種種類data
    const sceneData = computed(() => {
      return store.state.MyNearby.sceneData;
    });
    const foodData = computed(() => {
      return store.state.MyNearby.foodData;
    });
    const hotelData = computed(() => {
      return store.state.MyNearby.hotelData;
    });
    const activityData = computed(() => {
      return store.state.MyNearby.activityData;
    });
    watch(myLocation, () => {
      //取得使用者座標時才產生地圖，否則沒有中心點，會報錯
      creatMap(myLocation.value);
      addMarkerAndPopInfor(myLocation.value); //把我的座標貼上去
    });
    let openStreetMap = {} as any;
    function creatMap(centerPosition = [25.042474, 121.513729]) {
      //Leaflet 的 map 方法接收兩個參數：
      //第一個參數是地圖擺放位置的 id，在實作基本介面時，我們有先寫好 <div id="map"></div>。
      //第二個參數是一個物件，center 設定一開始顯示地圖的座標（這邊設定五倍的座標 XD），而 zoom 則是縮放比例。
      openStreetMap = L.map("leafletMap", {
        center: [centerPosition[1], centerPosition[0]],
        zoom: 18,
      });
      //創建圖磚
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
      }).addTo(openStreetMap);
    }
    function addMarkerAndPopInfor(position: number[], itemData?: any) {
      //傳入該項目座標，或data
      L.marker([position[1], position[0]]).addTo(openStreetMap).bindPopup(`
            <p v-if="itemData.ScenicSpotName">${itemData.ScenicSpotName}</p>
            <p v-if="itemData.ActivityName">${itemData.ActivityName}</p>
            <p v-if="itemData.HotelName">${itemData.HotelName}</p>
            <p v-if="itemData.RestaurantName">${itemData.RestaurantName}</p>
        `);
    }
    function removeMarker() {
      //移除圖層
      openStreetMap.eachLayer((layer: LayerGroup) => {
        if (layer instanceof L.Marker) {
          openStreetMap.removeLayer(layer);
        }
      });
    }
    return {};
  },
});
</script>
