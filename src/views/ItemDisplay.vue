<template>
  <div class="itemDisplay">
    <header class="itemDisplay-header">
      <!-- <h1 class="title-font">{{itemData.Name}}</h1> -->
      <h1 v-show="itemData.RestaurantName">{{ itemData.RestaurantName }}</h1>
      <h1 v-show="itemData.ScenicSpotName">{{ itemData.ScenicSpotName }}</h1>
      <h1 v-show="itemData.HotelName">{{ itemData.HotelName }}</h1>
      <h1 v-show="itemData.ActivityName">{{ itemData.ActivityName }}</h1>
    </header>
    <div class="itemDisplay-contain p-4">
      <div class="itemDisplay-info d-flex flex-column align-items-center  flex-lg-row justify-content-lg-between mb-3">
        <div class="itemDisplay-img">
          <img
            v-if="itemData.Picture.PictureUrl1"
            :src="itemData.Picture.PictureUrl1"
            :alt="itemData.Picture.PictureDescription1"
          />
          <img
            v-else
            src="../assets/images/defaultImg.webp"
            alt="作者無提供照片"
          />
        </div>
        <div class="itemInfo">
          <div v-if="itemData.Grade" class="d-flex">
            <div class="hotelGradeIcon me-2"></div>
            <p class="itemInfo-Grade">{{ itemData.Grade }}</p>
          </div>
          <div v-if="itemData.Spec" class="d-flex">
            <div class="priceIcon me-2"></div>
            <p class="itemInfo-Spec">{{ itemData.Spec }}</p>
          </div>
          <div v-if="itemData.TicketInfo" class="d-flex">
            <div class="priceIcon me-2"></div>
            <p class="itemInfo-TicketInfo">{{ itemData.TicketInfo }}</p>
          </div>
          <div v-if="itemData.Phone" class="d-flex">
            <div class="phoneIcon me-2"></div>
            <p class="itemInfo-Phone">{{ itemData.Phone }}</p>
          </div>
          <div class="d-flex">
            <div class="webSiteIcon"></div>
            <div class="itemInfo-web">
              <a :href="itemData.WebsiteUrl" target="_blank">相關網站</a>
            </div>
          </div>
          <div v-if="itemData.OpenTime" class="d-flex">
            <div class="seeScheduleIcon"></div>
            <div class="itemInfo-OpenTime">{{ itemData.OpenTime }}</div>
          </div>
          <div class="d-flex">
            <div class="locationIcon"></div>
            <div class="itemInfo-adress">{{ itemData.Address }}</div>
          </div>
          <div v-if="itemData.Organizer" class="d-flex">
            <div class="organizerIcon"></div>
            <div class="itemInfo-organizer">{{ itemData.Organizer }}</div>
          </div>
          <div v-if="itemData.StartTime" class="d-flex">
            <div class="seeScheduleIcon"></div>
            <div class="itemInfo-seTime">
              {{ itemData.StartTime }}/{{ itemData.EndTime }}
            </div>
          </div>
          <!-- 重新撰寫收藏的機制 @click="selected('activity', activityData.ActivityID, activityData)" -->
          <div class="d-flex" v-if="collected">
              <div class="collect" @click="selected(itemCategory[0], itemData[itemCategory[0]], itemData)"></div>
              <div>取消收藏</div>
          </div>
          <div class="d-flex" v-if="!collected">
              <div class="disCollect" @click="selected(itemCategory[0], itemData[itemCategory[0]], itemData)"></div>
              <div>收藏</div>
          </div>
        </div>
      </div>
      <div class="decorateLine"></div>
      <div class="itemDisplay-Discription">
        <h3 class="subTitle2-font travelInfo">相關資訊</h3>
        <img
          class="itemDisplay-img"
          v-if="itemData.Picture.PictureUrl2"
          :src="itemData.Picture.PictureUrl2"
          :alt="itemData.Picture.PictureDescription2"
        />
        <div class="discrption lineHeight">
          <p class="subTitle2-font">{{ itemData.DescriptionDetail }}</p>
          <p class="subTitle2-font">{{ itemData.Description }}</p>
        </div>
        <img
          class="itemDisplay-img"
          v-if="itemData.Picture.PictureUrl3"
          :src="itemData.Picture.PictureUrl3"
          :alt="itemData.Picture.PictureDescription3"
        />
        <div class="mt-5" v-if="itemData.TravelInfo">
          <h3 class="subTitle2-font travelInfo">旅遊資訊:</h3>
          {{ itemData.TravelInfo }}
        </div>
        <div class="mt-5" v-if="itemData.ParkingPosition">
          <h3 class="subTitle2-font travelInfo">停車資訊:</h3>
          {{ itemData.ParkingPosition }}
        </div>
        <div class="mt-5" v-if="itemData.Remarks">
          <h3 class="subTitle2-font travelInfo">注意事項:</h3>
          {{ itemData.Remarks }}
        </div>
      </div>
    </div>
  </div>
  <footer class="itemDisplay-footer">
    <!-- 搜尋周邊 -->
    <NearbyBar/>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DrageItem from "@/components/card/DrageItem.vue";
import NearbyBar from '@/components/NearbyBar.vue';
import { useStore } from "vuex";
export default defineComponent({
  components: {
    DrageItem,
    NearbyBar,
  },
  setup() {
    onMounted(() => {
      //設定搜尋周邊的中心點
      store.commit("NearbyBar/setCenter",[
            itemData.value.Position.PositionLon,
            itemData.value.Position.PositionLat,
          ])
        //判斷local中的收藏id是否符合本卡id，若是，就顯示true
        if(localStorage.getItem(itemData.value[itemCategory.value[0]])){
            collected.value = true
        }else{
            collected.value = false
        }
    });
    const store = useStore()
    const route = useRoute();
    const itemData = computed(() => {
      if (route.query.data) {
        return JSON.parse(route.query.data as string);
      }
    });
    const currentNearByTag = ref("景點");
    const nearbyDistance = ref(1000);
    const nearbyScene = ref();
    const nearbyFood = ref();
    const nearbyActivity = ref();
    const nearbyHotel = ref();
    const collected = ref(false);
    const itemCategory = computed(()=>{ //取得資料的屬性key值
        return Object.keys(itemData.value)
    })
    watch(itemData, () => {
      if (itemData.value) {
        store.commit("NearbyBar/setCenter",[
            itemData.value.Position.PositionLon,
            itemData.value.Position.PositionLat,
          ])
      }
    });
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
    return {
      //data
      itemData,
      nearbyScene,
      nearbyFood,
      nearbyActivity,
      nearbyHotel,
      nearbyDistance,
      currentNearByTag,
      collected,
      itemCategory,
      //methods
      selected,
    };
  },
});
</script>