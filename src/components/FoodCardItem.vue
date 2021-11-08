<template>
    <div class="foodCard row">
        <div class="foodCard-img">
            <img :src="foodyData.Picture.PictureUrl1" :alt="foodyData.Picture.PictureDescription1">
        </div>
        <div class="foodCard-content">
            <p>{{foodyData.Name}}</p>
            <p>{{foodyData.City}}</p>
          
        </div>
    </div>
 
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    props:{
        foodyData:{}
    },
    setup(){
        
        return{

        }
    }
})
</script>