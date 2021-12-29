<template>
    <div class="d-block d-xl-none m-2 p-2">
        <p>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#cityListBtn" aria-expanded="false" aria-controls="cityListBtn">
                    選擇縣市
            </button>
        </p>
        <div class="show" id="cityListBtn">
            <div class="d-flex flex-wrap">
                <button class="miniSelectBtn col-3 m-3 mb-1" v-for="(city,index) in cityList" :key="index" @click="toCity(city.CityID)">{{city.CityName}}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useStore} from 'vuex'
import {City} from '../types/enum'
export default defineComponent({
    components:{

    },
    setup(){
        const store = useStore()
        const cityList = store.state.cityList
        function toCity (cityNum:number) {
            store.commit('switchCity',City[cityNum])
            switch(cityNum){
                case 0 :
                    store.commit('switchCityChinese',"臺灣") 
                    break
                case 20:
                     store.commit('switchCityChinese',"金門縣") 
                    break
                case 21:
                     store.commit('switchCityChinese',"澎湖縣") 
                    break
                case 22:
                     store.commit('switchCityChinese',"連江縣") 
                    break
            }
        }
        return{
            //data
            cityList,
            //methods
            toCity,
        }
    }
})
</script>