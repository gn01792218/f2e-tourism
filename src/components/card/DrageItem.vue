<template>
    <div :id="dataKeyList" class="drageItem m-2" @click="gotItemPage(data)" draggable="true" @dragstart="drag">
        <div class="drageItem-img">
            <img v-if="data.Picture.PictureUrl1" :src="data.Picture.PictureUrl1" :alt="data.Picture.PictureDescription1">
            <img v-else src='../../assets/images/defaultImg.webp' alt="作者無提供照片">
        </div>
        <div class="dragItem-content p-1">
            <p>{{category}}</p>
            <p v-show="data.RestaurantName">{{ data.RestaurantName }}</p>
            <p v-show="data.ScenicSpotName">{{ data.ScenicSpotName }}</p>
            <p v-show="data.HotelName">{{ data.HotelName }}</p>
            <p v-show="data.ActivityName">{{ data.ActivityName }}</p>
            <div class="d-flex">
                <div class="locationIcon2"></div>
                <p>{{data.City}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue'
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
        const dataKeyList = computed(()=>{ //取得data是屬於Scene還是hotel等的屬性ID key值
            return data[Object.keys(data)[0]]
        })
        switch(category){
            case "景點" :
                break
        }
        function drag (e:any) {
            e.dataTransfer.setData('text/plain',dataKeyList.value ) //設置拖曳對象的id
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
            drag,gotItemPage,dataKeyList
        }
    }
})
</script>
