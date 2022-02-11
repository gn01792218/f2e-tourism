<template>
  <Header/>
  <div class="container position-relative">
    <Loading v-if="loadingStatus"/>
    <Nav/>
    <router-view />
  </div>
  <Fotter />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import Header from '@/views/Header.vue'
import Nav from '@/views/Nav.vue'
import Fotter from '@/views/Footer.vue'
import Loading from '@/components/Loading.vue'
import {useStore} from 'vuex'
export default defineComponent({
    components:{
      Header,Fotter,Loading,Nav,
    },
    setup(){
        //vuex
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
