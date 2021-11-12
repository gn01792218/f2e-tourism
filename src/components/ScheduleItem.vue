<template>
    <div class="scheduleItem">
        {{scheduleData.scheduleTitle}}
        {{scheduleData.scheduleDscription}}
        <div class="row mb-5" v-for="(i,index) in scheduleData.Date" :key="index">
            <header class="col-2">
                <!-- {{i}} -->
                {{i.split('/')[0]}}{{i.split('/')[1]}}
            </header>
            <div class="dragContainer"></div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    components:{

    },
    props:{
        scheduleData:{},
        show:{
            type:Boolean,
            default:false,
        }
    },
    setup(){
        const drageTarget = document.querySelectorAll('#drageItem') as NodeListOf<HTMLElement>  //獲取拖曳對象列表
        const drageContainer = document.querySelectorAll('.dragContainer') as NodeListOf<HTMLElement>
        drageTarget?.forEach((i:HTMLElement)=>{
            i.addEventListener('dragstart',(e:any)=>{
                console.log(i)
                i.style.boxShadow="5px 5px black"
                e.dataTransfer.setData('text/plain', e.target.id)
            })
        })
        drageContainer.forEach((i:HTMLElement)=>{
            i.addEventListener('drop',dropped)
            i.addEventListener('dragenter',()=>{})
            i.addEventListener('dragover',()=>{})
        })
        function dropped(e:any) {
            cancelDefault(e)   //使容器可以被放置元素
            let id = e.dataTransfer.getData('text/plain');   //獲取id
            e.target.appendChild(document.querySelector(`.${id}`));  //抓取該id元素，放到目標容器中
        };
        function cancelDefault(e:any) {
            e.preventDefault();
            e.stopPropagation();
            return false
        }
        return{

        }
    }
})
</script>