<template>
    <div class="scheduleItem">
        {{scheduleData.scheduleTitle}}
        {{scheduleData.scheduleDscription}}
        <div class="row mb-5" v-for="(i,index) in scheduleData.Date" :key="index">
            <header class="col-2">
                {{i.split('/')[0]}}{{i.split('/')[1]}}
            </header>
            <div class="dragContainer" @drop="drop(e,index)" @dragenter="cancelDefault" @dragover="cancelDefault">
                <transition-group name="fade-left">

                </transition-group>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

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
        const localStorage = window.localStorage
        function cancelDefault(e:any) {
            e.preventDefault();
            e.stopPropagation();
            return false
        };
        function drop (e:any,index:number) {   //index表示放在第幾格容器裡面
            cancelDefault(e)
            let dragTargetID = e.dataTransfer.getData('text/plain')
            let dragTarget = document.querySelector(`#${dragTargetID}`)
            e.target.appendChild(dragTarget);
            console.log(dragTarget)
            //設置localStorage的紀錄
            console.log(scheduleData.ID)
            console.log(index)
            //直接找此清單
            let schedule = JSON.parse(localStorage.getItem(scheduleData.ID) as string)
            //建立旅遊清單
            schedule.schedule = [{index:[dragTarget]}]
            localStorage.setItem(scheduleData.ID,JSON.stringify(schedule))
            console.log(schedule?.ID)

            //往裡面添加新的欄位!schedule:{0:[拖曳元素]}
                // localStorage.setItem(`${scheduleData.ID}-${index}`,JSON.stringify(dragTarget))
        }
        return{
            //methods
            drop,cancelDefault,
        }
    }
})
</script>