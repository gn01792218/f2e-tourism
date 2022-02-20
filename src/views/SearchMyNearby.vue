<template>
  <div class="itemDisplay">
    <header class="itemDisplay-header">
      <h1>我附近有什麼?</h1>
      <div class="selectBar">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked
            v-model="scene"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked"
            >顯示景點</label
          >
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            v-model="hotel"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked"
            >顯示旅宿</label
          >
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            v-model="food"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked"
            >顯示餐飲</label
          >
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            v-model="activity"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked"
            >顯示活動</label
          >
        </div>
      </div>
    </header>
    <div class="mynearbyItem-contain p-4">
      <!-- 地圖 -->
      <MyNearbyMap />
      <div class="decorateLine"></div>
      <!-- 資訊展示處 -->
      <div class="itemDisplay-Discription" v-if="showItem">
        <h3 class="subTitle2-font travelInfo">相關資訊</h3>
        <img
          class="itemDisplay-img"
          v-if="showItem.Picture"
          :src="showItem.Picture.PictureUrl2"
          :alt="showItem.Picture.PictureDescription2"
        />
        <div class="discrption lineHeight">
          <p class="subTitle2-font">{{ showItem.DescriptionDetail }}</p>
          <p class="subTitle2-font">{{ showItem.Description }}</p>
        </div>
        <img
          class="itemDisplay-img"
          v-if="showItem.Picture"
          :src="showItem.Picture.PictureUrl3"
          :alt="showItem.Picture.PictureDescription3"
        />
        <div class="mt-5" v-if="showItem.TravelInfo">
          <h3 class="subTitle2-font travelInfo">旅遊資訊:</h3>
          {{ showItem.TravelInfo }}
        </div>
        <div class="mt-5" v-if="showItem.ParkingPosition">
          <h3 class="subTitle2-font travelInfo">停車資訊:</h3>
          {{ showItem.ParkingPosition }}
        </div>
        <div class="mt-5" v-if="showItem.Remarks">
          <h3 class="subTitle2-font travelInfo">注意事項:</h3>
          {{ showItem.Remarks }}
        </div>
      </div>
    </div>
  </div>
  <footer class="itemDisplay-footer">
    <!-- 附近景點卡牌Bar -->
    <NearbyBar/>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch , onMounted} from "vue";
import { useStore } from "vuex";
import MyNearbyMap from "@/components/Map/MyNearbyMap.vue";
import NearbyBar from "@/components/NearbyBar.vue";
export default defineComponent({
  components: {
    MyNearbyMap,
    NearbyBar,
  },
  setup() {
    onMounted(() => getUserLocation());
    const store = useStore();
    //地圖篩選種類
    const scene = ref(true);
    const hotel = ref(false);
    const food = ref(false);
    const activity = ref(false);
    watch(scene, () => {
      store.commit("NearbyBar/setScene", scene.value);
    });
    watch(hotel, () => {
      store.commit("NearbyBar/setHotel", hotel.value);
    });
    watch(food, () => {
      store.commit("NearbyBar/setFood", food.value);
    });
    watch(activity, () => {
      store.commit("NearbyBar/setActivity", activity.value);
    });
    //展示用的使用者點選的item資料
    const showItem = computed(() => {
      return store.state.NearbyBar.showItem;
    });
    function getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          store.commit("NearbyBar/setCenter",[
            position.coords.longitude,
            position.coords.latitude,
          ])
        });
      } else {
        alert("抱歉，您的裝置無法使用地理定位");
      }
    }
    return {
      //data
      scene,
      hotel,
      food,
      activity,
      showItem,
      //methods
    };
  },
});
</script>
