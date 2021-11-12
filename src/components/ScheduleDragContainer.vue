<template>
    <transition name="fade-right">
        <div class="scheduleDragContainer">
            <button @click="pre">上一步</button>
            {{scheduleList[0].selectDate[0]}}
        </div>
    </transition>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'

export default defineComponent({
    components:{

    },
    emits:[
        'preStep'
    ],
    setup(props,{emit}){
        //先撈取本地的行程清單列表
        const localStorage = window.localStorage
        const scheduleListMap = ref(localStorage.getItem('scheduleListIDMap')?.split('#'))
        const scheduleCount = computed(()=>{
            return scheduleListMap
        })
        console.log(scheduleListMap.value)
        const scheduleList = computed(()=>{  //用來裝行程清單資料的
           return scheduleListMap.value?.map(i=>{
               if(i!==""){
                   console.log(i)
                   return JSON.parse(localStorage.getItem(i) as any)
               }
           })
        })
         console.log(scheduleList.value)
        watch(scheduleList,()=>{
           
        })
        function pre () {
            emit('preStep')
        } 
        return{ 
            //methods
            pre,scheduleList,
        }
    }
})
</script>