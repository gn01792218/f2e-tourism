<template>
  <div class="home">
    <Carousel />
    <img alt="Vue logo" src="../assets/logo.png">
    
    <!-- <HelloWorld/> -->
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
export default defineComponent({
  components: {
    HelloWorld,Carousel,
  },
  setup(){
    //這裡只渲染前X筆 all的資料
    return {

    }
  }
});
</script>
