<template>
    <div id="drageItem" class="drageItem m-2" draggable="true">
        <p>{{category}}</p>
        <p>{{data.Name}}</p>
    </div>
 
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    components:{

    },
    props:{
        //只需要Name 和 ID 
        data:{},
        category:{
            type:String
        },
        
    },
    setup({category,data}){
        console.log(data)
        switch(category){
            case "景點" :
                
                break
        }
        return{

        }
    }
})
</script>
