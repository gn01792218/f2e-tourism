<template>
<!-- 加入carousel-fade來取代滑動的圖片撥放動畫 -->
  <div id="carouselExampleCaptions" class="carousel slide carousel-fade " data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
      <!-- 給carousel-item 元素下 data-bs-interval="2000"來控制每一張的時間-->
    <div class="carousel-item active" data-bs-interval="200">
      <img src="https://picsum.photos/id/684/600/400" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="200">
      <img src="https://picsum.photos/id/1020/600/400" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/id/684/600/400" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="bi bi-box-arrow-in-left" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="bi bi-arrow-bar-right" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
 
});
</script>