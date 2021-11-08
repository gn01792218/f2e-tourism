<template>
    <div class="hotelCard mb-3">
        <div class="hotelCard-img col-12 col-lg-7">
            <img class="w-100" :src="hotelData.Picture.PictureUrl1" :alt="hotelData.Picture.PictureDescription1">
        </div>
        <div class="hotelCard-content col-12 col-lg-4">
            <p>{{hotelData.Class}}</p>
            <p class="hotelName">{{hotelData.Name}}</p>
            <p>{{hotelData.Address}}</p>
            <div class="phone"><i class="bi bi-telephone-forward-fill"></i><i>{{hotelData.Phone}}</i></div>
            
        </div>
</div>
    
 
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    props:{
        hotelData:{}
    },
    setup(){
        
        return{

        }
    }
})
</script>