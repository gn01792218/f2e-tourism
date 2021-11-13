<template>
    <div :id="data.ID" class="drageItem m-2" @click="gotItemPage(data)" draggable="true" @dragstart="drag">
        <p>{{category}}</p>
        <p>{{data.Name}}</p>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import { useRouter } from 'vue-router';
export default defineComponent({
    components:{

    },
    props:{
        //只需要Name 和 ID 
        data:{
            type:Object,
            default:{}
        },
        category:{
            type:String,
            default:{},
        },
    },
    setup({category,data}){
        const router = useRouter()
        switch(category){
            case "景點" :
                
                break
        }
        function drag (e:any) {
            e.dataTransfer.setData('text/plain',data.ID ) //設置拖曳對象的id
        }
        function gotItemPage (data:any) {
            let temp = JSON.stringify(data)
            router.push({
                path:`/ItemDisplay`,
                query:{
                    data:temp
                }
            })
        }
        return{
            //methods
            drag,gotItemPage,
        }
    }
})
</script>
