<template>
    <transition name="fade-right">
        <div class="scheduleDragContainer">
            <button @click="pre">上一步</button>
            {{scheduleList}}
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
        
        const scheduleList = computed(()=>{  //用來裝行程清單資料的
           
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