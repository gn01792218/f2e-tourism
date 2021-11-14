<template>
   <transition name="fade-left">
       <div class="selectDate">
           <header class="d-flex align-item-center">
               <div class="addScheduleIcon"></div>
                 <p class="subTitle-font">step1:挑選日期</p>
           </header>
            <Calendar 
                @goToSchedule='next'
            />
    </div>
   </transition>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Calendar from '@/components/schedule/Calendar.vue'
export default defineComponent({
    components:{
        Calendar,
    },
    emits:[
        'nextStep'
    ],
    setup(props,{emit}){
        function next () {
            emit('nextStep')
        }
        return{
            //methods
            next,
        }
    }
})
</script>