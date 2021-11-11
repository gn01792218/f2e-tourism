<template>
   <transition name="fade-left">
       <div class="selectDate">
        <p class="subTitle2-font">step1:挑選日期</p>
        <Calendar />
        <button @click="next">下一步</button>
    </div>
   </transition>
    
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Calendar from '@/components/Calendar.vue'
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