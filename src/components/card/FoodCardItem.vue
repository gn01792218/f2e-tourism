<template>
  <div class="col-12 col-md-3 mb-3 p-1 position-relative">
    <div class="foodCard card h-100 p-2">
      <div class="foodCard-img">
        <img
          class="w-100 h-100"
          @click="gotItemPage(foodData)"
          v-if="foodData.Picture"
          :src="foodData.Picture.PictureUrl1"
          :alt="foodData.Picture.PictureDescription1"
        />
        <img
          v-else
          src="../../assets/images/defaultImg.webp"
          alt="作者無提供照片"
        />
        <div class="drop position-absolute">
          <div class="d-flex">
                <i class="bi card-p bi-geo-alt-fill"></i>
                <p class="card-p" v-if="foodData.City">{{ foodData.City }}</p>
                <p class="card-p" v-else>猜猜我在哪</p>
            </div> 
            <p class="drop-title text-white">{{ foodData.RestaurantName }}</p>
            <button type="button" class="cusButton btn position-absolute" @click="gotItemPage(foodData)">more</button>
        </div>
        <span
              class="card-collect position-absolute"
              :class="[{ collect: collected }, { disCollect: !collected }]"
              @click="selected('RestaurantID', foodData.RestaurantID, foodData)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    foodData: {
      type: Object,
      default: {},
    },
  },
  setup({ foodData }) {
    onMounted(() => {
      //判斷local中的收藏id是否符合本卡id，若是，就顯示true
      if (localStorage.getItem(foodData.RestaurantID)) {
        collected.value = true;
      } else {
        collected.value = false;
      }
    });
    const router = useRouter();
    const localStorage = window.localStorage;
    const collected = ref(false);
    function selected(category: string, id: string, data: any) {
      collected.value = !collected.value;
      if (collected.value == true) {
        localStorage.setItem(id, JSON.stringify(data));
        if (!localStorage.getItem(`${category}CollectList`)) {
          //清單不存在的時候
          //建立清單
          localStorage.setItem(`${category}CollectList`, `${id}#`); //用陣列把ID存進去
        } else {
          //清單存在的時候
          //增加ID
          let temp = localStorage.getItem(`${category}CollectList`) as string;
          temp = `${temp}${id}#`;
          localStorage.setItem(`${category}CollectList`, temp);
        }
      } else {
        localStorage.removeItem(id);
        if (localStorage.getItem(`${category}CollectList`)) {
          //把清單裡面的ID排除
          let temp = localStorage.getItem(`${category}CollectList`) as string;
          let dataList = temp.split("#");
          // console.log("清單",dataList)
          temp = ""; //原本清單規0
          dataList.find((i, index) => {
            //找到該ID，刪除
            console.log(i);
            if (i === id) {
              // console.log("找到這個ID名稱")
              dataList[index] = "";
            }
          });
          // console.log("刪除後的清單清單",dataList)
          dataList.forEach((i: string) => {
            //再加回去清單中
            if (i !== "") {
              temp += `${i}#`;
            }
          });
          // console.log("新的清單",temp)
          localStorage.setItem(`${category}CollectList`, temp);
        }
      }
    }
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
      collected,
      //mathods
      selected,
      gotItemPage,
    };
  },
});
</script>
