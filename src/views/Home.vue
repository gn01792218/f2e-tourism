<template>
  <div class="home">
    <div class="home-bigAdvanture d-flex flex-column align-items-center">
      <div class="d-flex justify-content-center">
        <BigAdvantureCard
          @click="checkCard(index)"
          v-for="(i, index) in randomList"
          :key="i"
          :index="index"
          :data="i"
        />
      </div>
      <div class="mt-3 d-flex justifi-content-center">
        <div>
          <h3 >翻開牌來場大冒險吧~!</h3>
          <p class="advanture-sub-text">Get start for a Big Advanture!</p>
        </div>
        <div>
          <div class="randomIcon" @click="randomRecommend"></div>
          <p>洗牌</p>
        </div>
      </div>
    </div>
    <div class="home-containter">
      <div class="hotScene">
        <div class="card-bg"></div>
        <h3 class="title-font m-3">熱門景點</h3>
        <span class="decorateLine"></span>
        <SceneCardItem
          v-for="(scene) in hotScene"
          :key="scene"
          :sceneData="scene"
        />
      </div>
      <div class="hotActivity">
        <h3 class="title-font m-3">熱門活動</h3>
        <span class="decorateLine"></span>
        <ActivityCardItem
          v-for="(activity) in hotActivity"
          :key="activity"
          :activityData="activity"
        />
      </div>
      <div class="hotFood">
        <h3 class="title-font m-3">熱門食物</h3>
        <span class="decorateLine"></span>
        <FoodCardItem
          v-for="(food) in hotFood"
          :key="food"
          :foodData="food"
        />
      </div>
      <div class="hotHtel m-3">
        <h3 class="title-font">熱門旅宿</h3>
        <span class="decorateLine"></span>
        <HotelCardItem
          v-for="(hotel) in hotHotel"
          :key="hotel"
          :hotelData="hotel"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import SceneCardItem from "@/components/card/SceneCardItem.vue";
import ActivityCardItem from "@/components/card/ActivityCardItem.vue";
import FoodCardItem from "@/components/card/FoodCardItem.vue";
import HotelCardItem from "@/components/card/HotelCardItem.vue";
import BigAdvantureCard from "@/components/card/BigAdvantureCard.vue";
import { gsap, Power4 } from "gsap";
export default defineComponent({
  components: {
    SceneCardItem,
    ActivityCardItem,
    FoodCardItem,
    HotelCardItem,
    BigAdvantureCard,
  },
  setup() {
    onMounted(() => {
      store.dispatch("RandomItem/getRandomItem");
      store.dispatch("RandomItem/getRandomItem2");
    });
    //基本資料
    const selectCard = ref(false); //是否已經選擇了大冒險卡
    const selectCardElement = ref<HTMLElement | null>(null);
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
    const randomList = computed(() => {
      return store.state.RandomItem.randomItemList;
    });
    async function randomRecommend() {
      //先把牌翻回來
      if (selectCardElement.value) {
        //如果已經翻過牌，就得要先翻回來
        let cardUp = selectCardElement.value.children[0];
        let cardDown = selectCardElement.value.children[1];
        gsap.to(cardUp, { rotateY: "0deg" });
        gsap.to(cardDown, { rotateY: "180deg" }).then(() => {
          selectCardElement.value = null;
          store.dispatch("RandomItem/getRandomItem");
          store.dispatch("RandomItem/getRandomItem2");
          ShuffleCardAnimate();
        });
      } else {
        //直接洗牌
        selectCard.value = true; //防止洗牌中翻牌
        store.dispatch("RandomItem/getRandomItem");
        store.dispatch("RandomItem/getRandomItem2");
        ShuffleCardAnimate();
      }
    }
    function checkCard(cardIndex: number) {
      if (!selectCard.value) {
        //尚未翻過牌才可以翻牌
        selectCard.value = true;
        selectCardElement.value = document.querySelector(
          `.bigAdvantureCard${cardIndex}`
        ) as HTMLElement;
        let cardUp = selectCardElement.value.children[0];
        let cardDown = selectCardElement.value.children[1];
        gsap.to(cardUp, { rotateY: "180deg" });
        gsap.to(cardDown, { rotateY: "0deg" });
      }
    }
    function ShuffleCardAnimate() {
      let card1 = document.querySelector(".bigAdvantureCard0") as HTMLElement;
      let card2 = document.querySelector(".bigAdvantureCard1") as HTMLElement;
      gsap.to(card1, {
        keyframes: [
          { x: 200, repeat: 3 },
          { duration: 1, x: 0, ease: Power4.easeOut },
        ],
      });
      gsap
        .to(card2, {
          keyframes: [
            { x: -200, repeat: 3 },
            { duration: 1, x: 0, ease: Power4.easeOut },
          ],
        })
        .then(() => {
          selectCard.value = false; //洗完牌之後都是可以選擇的
        });
    }
    return {
      //data
      hotScene,
      hotHotel,
      hotFood,
      hotActivity,
      randomList,
      //methods
      randomRecommend,
      checkCard,
    };
  },
});
</script>
<style scoped lang="scss">
</style>