<template>
    <div class="activityCard row">
        <div class="activityCard-img">
            <img :src="activityData.Picture.PictureUrl1" :alt="activityData.Picture.PictureDescription1">
        </div>
        <div class="activityCard-content">
            <p>{{activityData.Name}}</p>
            <p>{{activityData.Organizer}}</p>
            <p>{{activityData.Location}}</p>
            <p>舉辦時間{{activityData.StartTime}}</p>
        </div>
    </div>
 
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    props:{
        activityData:{}
    },
    setup(){
        
        return{

        }
    }
})
</script>