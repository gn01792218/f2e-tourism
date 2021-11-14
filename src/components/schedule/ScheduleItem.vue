<template>
    <div class="scheduleItem">
        {{scheduleData.scheduleTitle}}
        {{scheduleData.scheduleDscription}}
        <button @click="deletSchedule">刪除行程</button>
        <div class="row mb-5" v-for="(i,index) in scheduleData.Date" :key="index">
            <header class="col-2">
                {{i.split('/')[0]}}{{i.split('/')[1]}}
            </header>
            <div :class="[`dragContainer#${index}`,'dragContainer']" @drop="drop" @dragenter="cancelDefault" @dragover="cancelDefault">
                <transition-group name="fade-left">

                </transition-group>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    components:{

    },
    props:{
        scheduleData:{
            type:Object,
            default:{}
        },
        show:{
            type:Boolean,
            default:false,
        }
    },
    setup({scheduleData}){
        const router = useRouter()
        const store = useStore()
        const localStorage = window.localStorage
        function cancelDefault(e:any) {
            e.preventDefault();
            e.stopPropagation();
            return false
        };
        function drop (e:any) {   //index表示放在第幾格容器裡面
            cancelDefault(e)
            let dragTargetID = e.dataTransfer.getData('text/plain')
            let dragTarget = document.querySelector(`#${dragTargetID}`)
            e.target.appendChild(dragTarget);
            console.log(dragTarget)
            //設置localStorage的紀錄
            console.log(scheduleData.ID)
            let dayIndex = e.target.classList[0].split('#')[1] //取得是第幾天的位置
            //直接找此清單
            let schedule = JSON.parse(localStorage.getItem(scheduleData.ID) as string)
            console.log("改造前的清單",schedule)
            //建立旅遊清單
            schedule[dayIndex].push(e.target)
            //問題一:再放下一次的時候，前面的會變成evi?!!!
            //再次拖拉也會再執行一次這個函式，會一直無止境的加下去
            //假如換位置的話，那就變得非常複雜了!!!!!
            console.log("改造後的清單",schedule)
            localStorage.setItem(scheduleData.ID,JSON.stringify(schedule))
        }
        function deletSchedule (){
            store.commit('isloading')
            localStorage.removeItem(scheduleData.ID)
            let map = localStorage.getItem('scheduleListIDMap')?.replace(`${scheduleData.ID}#`,"")
            localStorage.setItem('scheduleListIDMap',map as string)
            store.commit('loaded')
            router.go(0)
        }
        return{
            //methods
            drop,cancelDefault,deletSchedule,
        }
    }
})
</script>