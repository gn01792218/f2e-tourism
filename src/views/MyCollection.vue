<template>
    <CollectionContainer />
    <h1 class="title-font">我的收藏</h1>
    <ScheduleHome/>
    <div id="test"  draggable="true">拖曳區</div>
   
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CollectionContainer from '@/components/CollectionContainer.vue'
import ScheduleHome from '@/components/ScheduleHome.vue'
export default defineComponent({
    components:{
        CollectionContainer,ScheduleHome,
    },
    setup(){
        console.log("換我")
        return{

        }
    }
})
</script>