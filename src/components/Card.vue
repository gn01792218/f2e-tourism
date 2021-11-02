<template>
 <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-6">
      <img :src=imgSrc alt="">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <p class="card-text">{{description}}</p>
        <p class="card-text"><i class="bi bi-door-open-fill"></i><small class="text-muted">開放時間:{{openTime}}</small></p>
      </div>
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
      default:require("../assets/images/r1.png")
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
    }
  },
  setup(){

    return{

    }
  }
});
</script>