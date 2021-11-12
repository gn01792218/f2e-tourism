<template>
    <transition name="fade-right">
        <div class="scheduleDragContainer">
            <div class="d-flex"  v-for="(i,index) in scheduleList" :key="index">
                <div >{{i.scheduleTitle}}</div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {defineComponent,ref, watch,computed, onMounted} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    components:{

    },
    emits:[
        'preStep'
    ],
    setup(props,{emit}){
        //先撈取本地的行程清單列表
        onMounted(()=>{
            store.commit('MyCollection/getSchdulelist')
        })
        const store = useStore()
        const scheduleList = computed(()=>{  //用來裝行程清單資料的
           return store.state.MyCollection.schedulelist
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