<template>
  <header class="header">
    <div v-if="category == 'Scene'" class="w-100 h-100">
      <img
        class="w-100 h-100"
        src="../assets/images/sceneBg.jpg"
        alt="東海岸"
      />
    </div>
    <div v-if="category == 'Food'" class="w-100 h-100">
      <img
        class="w-100 h-100"
        src="../assets/images/foodBg.webp"
        alt="珍珠奶茶"
      />
    </div>

    <div v-if="category == 'Activity'" class="w-100 h-100">
      <img
        class="w-100 h-100"
        src="../assets/images/activityBg.webp"
        alt="藝術展覽"
      />
    </div>
    <div v-if="category == 'Hotel'" class="w-100 h-100">
      <img
        class="w-100 h-100"
        src="../assets/images/hotelBg.webp"
        alt="特色旅宿"
      />
    </div>
    <div
      v-if="
        (category !== 'Hotel' &&
          category !== 'Activity' &&
          category !== 'Food' &&
          category !== 'Scene') ||
        category == undefined
      "
      class="w-100 h-100"
    >
      <img
        class="w-100 h-100"
        src="../assets/images/itemBg.webp"
        alt="宮原眼科"
      />
    </div>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Carousel from "@/components/Carousel.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    Carousel,
  },
  setup() {
    const route = useRoute();
    const category = computed(() => {
      return route.params.category;
    });
    // watch(category,()=>{
    //     console.log("更換header背景圖",category.value)
    // })
    return {
      //
      category,
      //methods
    };
  },
});
</script>