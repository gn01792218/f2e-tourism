<template>
    <nav class="tripNav p-5">
        <div class="tripBG position-absolute">
            <img class="w-100" src="../assets/images/navBgImg.png" alt="大冒險:你要去哪裡">
        </div>
        <ul class="navItem mt-5 me-4">
            <router-link to="/">首頁</router-link> 
            <li class="navLi mb-3">
                <a @click="switchCategory(0)"><div class="hotelIcon"></div>旅宿搜尋</a> 
            </li>
            <li class="navLi mb-3">
                <a @click="switchCategory(1)"><div class="activityIcon"></div>活動搜尋</a> 
            </li>
            <li class="navLi mb-3">
                <a @click="switchCategory(2)"><div class="sceneIcon"></div>景點搜尋</a> 
            </li>
            <li class="navLi mb-3">
                <a @click="switchCategory(3)"><div class="foodIcon"></div>餐飲搜尋</a>
            </li>
            <li class="navLi mb-3">
                <router-link to="/MyCollection"><div class="collectforNav"></div>我的收藏</router-link>
            </li>
            <li class="navLi mb-3">
                <a data-bs-toggle="modal" data-bs-target="#whereAreYouGoModal"><div class="bigAdventureIcon"></div>大冒險</a>
            </li>
        </ul>
            
        <a class="back-to-top position-absolute" href="#top" > <div class="tszIcon"></div>Top </a>
    </nav>
    <WhereAreYouGoing/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
import {CardCategory} from '../types/enum'
import WhereAreYouGoing from '@/components/WhereAreYouGoing.vue'
export default defineComponent({
   components:{
       WhereAreYouGoing,
    },
   setup(){
        const store = useStore()
        const router = useRouter()
        function switchCategory (categoryIndex:number) {
            store.commit('switchCategory',CardCategory[categoryIndex])
            router.push(`/CityFilter/${CardCategory[categoryIndex]}`)
        }
        return {
            //data
             switchCategory,
        }
    }
})
</script>