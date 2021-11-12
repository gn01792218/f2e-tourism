<template>
    <CollectionContainer />
    <h1 class="title-font">我的收藏</h1>
    <Schedule/>
    <div id="test"  draggable="true">拖曳區</div>
   
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CollectionContainer from '@/components/CollectionContainer.vue'
import Schedule from '@/components/Schedule.vue'
export default defineComponent({
    components:{
        CollectionContainer,Schedule,
    },
    setup(){
        
        return{

        }
    }
})
</script>