<template>
    <div class="collectionTag d-flex">
        <button @click="currentTag='景點'">景點</button>
        <button @click="currentTag='旅宿'">旅宿</button>
        <button @click="currentTag='餐飲'">餐飲</button>
        <button @click="currentTag='活動'">活動</button>
    </div>
    <div class="d-flex" v-if="currentTag='景點'">
        <SceneCardItem 
            v-for="(scene,index) in SceneDataList" :key="index"
            :sceneData="scene"
        />
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue'
import SceneCardItem from '@/components/SceneCardItem.vue'
export default defineComponent({
    components:{
        SceneCardItem,
    },
    setup(){
       
        const localStorage = window.localStorage
        const currentTag = ref("餐飲")
        const sceneList = computed(()=>{ //清單陣列
            return localStorage.getItem('sceneCollectList')?.split('#')
        })
        const SceneDataList = reactive<Array<Object>>([])
        async function getSceneData () {
            //根據收藏清單，得到對應的物件
            await sceneList.value?.map(async(i)=>{
                if(i!==""){
                    await SceneDataList.push(JSON.parse(localStorage.getItem(i) as string)) 
                }
            })
        }
        onMounted(()=>{
             getSceneData()
        })
        return{
            //data
            currentTag,SceneDataList,
        }
    }
})
</script>