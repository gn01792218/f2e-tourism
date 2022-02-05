<template>
<!-- 手機版本 -->
  <div class="nav-mobile d-md-none">
      <nav class="navbar navbar-light fixed-top d-md-none">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">TSZ旅遊網</router-link>
          <router-link to="/SearchMyNearby" class="d-flex align-items-center">
          <div class="locationIcon"></div>
          我附近有什麼?</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">選單</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li class="nav-item mb-5">
                  <router-link class="nav-link" to="/">返回首頁</router-link>
                </li>
                <li class="nav-item">
                  <a @click="switchCategory(0)"
                    ><div class="hotelIcon"></div>
                    旅宿搜尋</a
                  >
                </li>
                <li class="navLi mb-3">
                  <a @click="switchCategory(1)"
                    ><div class="activityIcon"></div>
                    活動搜尋</a
                  >
                </li>
                <li class="navLi mb-3">
                  <a @click="switchCategory(2)"
                    ><div class="sceneIcon"></div>
                    景點搜尋</a
                  >
                </li>
                <li class="navLi mb-3">
                  <a @click="switchCategory(3)"
                    ><div class="foodIcon"></div>
                    餐飲搜尋</a
                  >
                </li>
                <li class="navLi mb-3">
                  <router-link to="/MyCollection"
                    ><div class="collectforNav"></div>
                    我的收藏</router-link
                  >
                </li>
                <li class="navLi mb-3">
                  <a data-bs-toggle="modal" data-bs-target="#whereAreYouGoModal"
                    ><div class="bigAdventureIcon"></div>
                    大冒險</a
                  >
                </li>
              </ul>
              <!-- <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form> -->
            </div>
          </div>
        </div>
      </nav>
  </div>
  <!-- 桌機版本 -->
  <nav class="tripNav p-5 d-none d-md-flex">
    <div class="tripNav-body d-flex justify-content-around">
      <ul class="navItem">
        <li class="navLi mb-3"><router-link to="/">首頁</router-link></li>
        <li class="navLi mb-3">
          <router-link to="/SearchMyNearby">搜尋附近</router-link>
        </li>
        <li class="navLi mb-3">
          <a @click="switchCategory(0)"
            ><div class="hotelIcon"></div>
            旅宿搜尋</a
          >
        </li>
        <li class="navLi mb-3">
          <a @click="switchCategory(1)"
            ><div class="activityIcon"></div>
            活動搜尋</a
          >
        </li>
        <li class="navLi mb-3">
          <a @click="switchCategory(2)"
            ><div class="sceneIcon"></div>
            景點搜尋</a
          >
        </li>
        <li class="navLi mb-3">
          <a @click="switchCategory(3)"
            ><div class="foodIcon"></div>
            餐飲搜尋</a
          >
        </li>
        <li class="navLi mb-3">
          <router-link to="/MyCollection"
            ><div class="collectforNav"></div>
            我的收藏</router-link
          >
        </li>
        <li class="navLi mb-3">
          <a data-bs-toggle="modal" data-bs-target="#whereAreYouGoModal"
            ><div class="bigAdventureIcon"></div>
            大冒險</a
          >
        </li>
      </ul>
      <div class="tripBG">
        <img
          class="w-100"
          src="../assets/images/navBgImg.png"
          alt="大冒險:你要去哪裡"
        />
      </div>
    </div>
    <a class="back-to-top position-absolute" href="#top">
      <div class="tszIcon"></div>
      Top
    </a>
  </nav>
  <WhereAreYouGoing />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { CardCategory } from "../types/enum";
import WhereAreYouGoing from "@/components/WhereAreYouGoing.vue";
export default defineComponent({
  components: {
    WhereAreYouGoing,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    function switchCategory(categoryIndex: number) {
      store.commit("switchCategory", CardCategory[categoryIndex]);
      router.push(`/CityFilter/${CardCategory[categoryIndex]}`);
    }
    return {
      //data
      switchCategory,
    };
  },
});
</script>