<template>
<!-- 沒有填縣市的將會被自動排除!!!!! v-if="city"-->
  <div class="sceneCard row mb-3">
    <div class="sceneCard-img col-8">
      <img class="w-100" :src=sceneData.Picture.PictureUrl1 :alt=sceneData.Picture.PictureDescription1>
    </div>
    <div class="sceneCard-content col-6 p-4">
      <h3>{{sceneData.Name}}</h3>
      <p>{{sceneData.DescriptionDetail}}</p>
      <i class="bi bi-door-open-fill">{{sceneData.OpenTime}}</i>
      <div class="d-flex">
        <i class="bi bi-geo-alt-fill"></i>
        <i>{{sceneData.City}}</i>
        <button type="button" class="btn btn-outline-success">more</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props:{
    sceneData:{}
  },
  setup(){
    return{

    }
  }
});
</script>