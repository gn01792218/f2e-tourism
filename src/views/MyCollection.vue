<template>
    <div class="myCollection">
        <header class="collection-header">
            <h1 class="title-font">我的收藏</h1>
        </header>
        <div class="collection-body">
            <CollectionContainer />
            <div class="d-flex">
                <div class="working"></div>
                <p>行程規畫表功能，尚處於施工階段，但使用者依然可以搶先體驗部分功能!</p>
            </div>
            <ScheduleHome/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CollectionContainer from '@/components/CollectionContainer.vue'
import ScheduleHome from '@/components/schedule/ScheduleHome.vue'
export default defineComponent({
    components:{
        CollectionContainer,ScheduleHome,
    },
    setup(){
        return{

        }
    }
})
</script>