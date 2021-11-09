<template>
  <Header/>
  <Nav/>
  <div class="container">
    <router-view />
  </div>
  <Fotter />
  <Loading v-if="loadingStatus"/>
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
