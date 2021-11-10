<template>
    行程規劃
    <div>Day1</div>
    <div>Day2</div>
    <div>Day3</div>
    <div>Day4</div>
    <div>Day5</div>

    <div id="test"  draggable="true">拖曳區</div>
    <CollectionContainer />
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CollectionContainer from '@/components/CollectionContainer.vue'
export default defineComponent({
    components:{
        CollectionContainer,
    },
    setup(){
        
        return{

        }
    }
})
</script>