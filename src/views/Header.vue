<template>
    <header class="header">
        <!-- <Carousel/> -->
        <router-link to="/MyCollection">行程規劃</router-link>
    </header>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import Carousel from '@/components/Carousel.vue'
export default defineComponent({
    components:{
        Carousel,
    },
    setup(){
       
      
        return{
            //methods
           
           
        }
    }
})
</script>