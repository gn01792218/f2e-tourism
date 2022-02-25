<template>
  <div class="bigAdvanture position-relative me-3" :class="[`bigAdvantureCard${index}`]">
    <div class="card-up w-100 h-100 position-absolute">
      <img
        v-if="index == 1"
        class="w-100 h-100"
        :src="cardUpImg"
        alt="TSZ大冒險卡牌正面"
      />
      <img
         v-if="index == 0"
        class="w-100 h-100"
        :src="cardUpImg2"
        alt="TSZ大冒險卡牌正面"
      />
    </div>
    <div class="card-down w-100 h-100 position-absolute p-5">
      <p v-if="data.ScenicSpotName" class="fw-bold">今天想來去 :</p>
      <p v-if="data.HotelName" class="fw-bold">來去住一晚 :</p>
      <p v-if="data.ActivityName" class="fw-bold">今天來參加 :</p>
      <p v-if="data.RestaurantName" class="fw-bold">今天來去吃 :</p>
      <div class="d-flex flex-column align-items-center">
        <p v-if="data.RestaurantName" class="dataName">{{ data.RestaurantName }}</p>
        <p v-if="data.ActivityName" class="dataName">{{ data.ActivityName }}</p>
        <p v-if="data.HotelName" class="dataName">{{ data.HotelName }}</p>
        <p v-if="data.ScenicSpotName" class="dataName">{{ data.ScenicSpotName }}</p>
        <div class="d-flex">
          <i class="bi card-p bi-geo-alt-fill"></i>
          <p class="card-p" v-if="data.city">{{ data.city }}</p>
          <p class="card-p" v-else>猜猜我在哪</p>
        </div>
        <div>
          <div class="img">
            <img
              class="w-100 h-100"
              v-if="data.Picture?.PictureUrl1"
              :src="data.Picture.PictureUrl1"
              :alt="data.Picture.PictureDescription1"
            />
            <img v-else :src="defaultPicture" alt="作者無提供照片" />
          </div>
        </div>
        <div class="bottom position-absolute" @click="gotItemPage(data)">
          <div class="bigAdventureIcon" ></div>
          <p>前往查看</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: {},
    },
    index: {
      type: Number,
    },
  },
  components: {},
  setup() {
    //基本資料
    const cardUpImg = require("@/assets/images/bigAdvantureCardUp.webp");
    const cardUpImg2 = require("@/assets/images/bigAdvantureCardUp2.webp");
    const defaultPicture = require("@/assets/images/defaultImg.webp");
    //路由資料
    const router = useRouter();
    function gotItemPage(data: any) {
      let temp = JSON.stringify(data);
      router.push({
        path: `/ItemDisplay`,
        query: {
          data: temp,
        },
      });
    }
    return {
      //data
      cardUpImg,
      defaultPicture,
      cardUpImg2,
      //methods
      gotItemPage,
    };
  },
});
</script>