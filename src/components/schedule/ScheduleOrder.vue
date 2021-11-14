<template>
    <transition name="fade-right">
        <div class="scheduleDragContainer">
            <header class="scheduleHeader d-flex">
                 <div class="me-3 ms-3" :class="{'activeSchedule':i.ID==currentSchedule.ID}" v-for="(i,index) in scheduleList" :key="index" @click="selectSchedule(i)">{{i.scheduleTitle}}</div>
            </header>
            <main class="scheduleItem-body">
                    <ScheduleItem v-for="(i,index) in scheduleList" :key="index"
                        :scheduleData="i"
                        v-show="currentSchedule.ID===i.ID"
                    />
                    
            </main>
        </div>
        
    </transition>
         
</template>

<script lang="ts">
import {defineComponent,computed, ref, watch} from 'vue'
import { useStore } from 'vuex'
import ScheduleItem from '@/components/schedule/ScheduleItem.vue'
export default defineComponent({
    components:{
        ScheduleItem,
    },
    emits:[
        'preStep'
    ],
    setup(props,{emit}){
        const store = useStore()
        //先撈取本地的行程清單列表
        store.commit('MyCollection/getSchdulelist')
        const scheduleList = computed(()=>{  //用來裝行程清單資料的
           return store.state.MyCollection.schedulelist
        })
        watch(scheduleList,()=>{
            currentSchedule.value = scheduleList.value[0]
        })
        const currentSchedule = ref(scheduleList.value[0])
        console.log(scheduleList.value)
        function pre () {
            emit('preStep')
        } 
        function selectSchedule (scheduleData:any){
            currentSchedule.value = scheduleData
        }
        return{ 
            //data
            currentSchedule,scheduleList,
            //methods
            pre,selectSchedule
        }
    }
})
</script>