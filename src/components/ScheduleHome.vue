<template>
    <div class="schedule">
        <h2 class="subTitle-font">行程規劃:</h2>
        <SelectDate 
            v-show="scheduleStep==1"
            @nextStep="scheduleStep=2"
        />
        <button v-show="scheduleStep==1" @click="scheduleStep=2">看行程表</button>
        <ScheduleOrder
            v-show="scheduleStep==2"
            @preStep="scheduleStep=1"
        />
        <button v-show="scheduleStep==2" @click="scheduleStep=1">挑選好日期</button>
   </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue'
import SelectDate from '@/components/SelectDate.vue'
import ScheduleOrder from '@/components/ScheduleOrder.vue'
export default defineComponent({
    components:{
        SelectDate,ScheduleOrder,
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