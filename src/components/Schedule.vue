<template>
    <div class="schedule">
        <h2 class="subTitle-font">行程規劃:</h2>
        <SelectDate 
            v-show="scheduleStep==1"
            @nextStep="scheduleStep=2"
        />
        <ScheduleDragContainer
            v-show="scheduleStep==2"
            @preStep="scheduleStep=1"
        />
   </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue'
import SelectDate from '@/components/SelectDate.vue'
import ScheduleDragContainer from '@/components/ScheduleDragContainer.vue'
export default defineComponent({
    components:{
        SelectDate,ScheduleDragContainer,
    },
    setup(){
        const scheduleStep = ref<number>(1)
        return{
            //data
            scheduleStep,
        }
    }
})
</script>