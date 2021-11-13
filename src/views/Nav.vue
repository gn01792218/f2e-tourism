<template>
    <nav class="nav">
        <router-link to="/">首頁</router-link> |
        <a @click="switchCategory(0)">旅宿搜尋</a> |
        <a @click="switchCategory(1)">活動搜尋</a> |
        <a @click="switchCategory(2)">景點搜尋</a> |
        <a @click="switchCategory(3)">餐飲搜尋</a>
        <router-link to="/about">關於我</router-link>
        <button data-bs-toggle="modal" data-bs-target="#whereAreYouGoModal">大冒險:請問，你要去哪裡?</button>
        <a href="#top" class="back-to-top"> Back to top </a>
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