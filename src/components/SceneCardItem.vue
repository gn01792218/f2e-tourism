<template>
<!-- 沒有填縣市的將會被自動排除!!!!! -->
  <div class="sceneCard row mb-3" v-if="city">
    <div class="sceneCard-img col-8">
      <img class="w-100" :src=imgSrc :alt=imgAlt>
    </div>
    <div class="sceneCard-content col-6 p-4">
      <h3>{{title}}</h3>
      <p>{{description}}</p>
      <i class="bi bi-door-open-fill">{{openTime}}</i>
      <div class="d-flex">
        <i class="bi bi-geo-alt-fill"></i>
        <i>{{city}}</i>
        <button type="button" class="btn btn-outline-success">more</button>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props:{
    imgSrc:{
      type:String,
      default:require("../assets/images/vue.png")
    },
    imgAlt:{
      type:String,
    },
    title:{
      type:String,
      defalut:""
    },
    description:{
      type:String,
      default:""
    },
    openTime:{
      type:String,
      default:"暫無資料"
    },
    city:{
      type:String,
    }
  },
  setup(){

    return{

    }
  }
});
</script>