<template>
<div class="container">
  <Header />
  <router-view />
</div>
  <Loading v-if="loadingStatus"/>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import Header from '@/views/Header.vue'
import Loading from '@/components/Loading.vue'
import {useStore} from 'vuex'
export default defineComponent({
    components:{
      Header,Loading,
    },
    setup(){
        const store = useStore()
        const loadingStatus = computed(()=>{
          return store.state.loading
        })
        return{
          loadingStatus,
        }
    }
})
</script>
