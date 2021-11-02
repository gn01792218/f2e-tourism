<template>
          {{data}}
        {{location}}
        <button class="btn btn-primary" 
            data-bs-target="#collapseTarget" 
            data-bs-toggle="collapse">
            Bootstrap collapse
        </button>
        <div class="collapse py-2" id="collapseTarget">
            This is the toggle-able content!
        </div>
        <i class="bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i>
        
        <div><Loading v-if="isloading"/></div>
 
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import {getTourismDataByCity} from '../api'
import Loading from './Loading.vue'
enum City {
    Taipei ="Taipei",
    NewTaipei = "NewTaipei",
    Taoyuan = "Taoyuan",
    Taichung = "Taichung",
    Tainan = "Tainan",
    Kaohsiung = "Kaohsiung",
    Keelung = "Keelung",
    Hsinchu = "Hsinchu",
    HsinchuCounty = "HsinchuCounty",
    MiaoliCounty = "MiaoliCounty",
    ChanghuaCounty = "ChanghuaCounty",
    NantouCounty = "NantouCounty",
    YunlinCounty = "YunlinCounty",
    ChiayiCounty ="ChiayiCounty",
    Chiayi = "Chiayi",
    PingtungCounty = "PingtungCounty",
    YilanCounty = "YilanCounty",
    HualienCounty = "HualienCounty",
    TaitungCounty ="TaitungCounty",
    KinmenCounty ="KinmenCounty",
    PenghuCounty = "PenghuCounty",
    LienchiangCounty ="LienchiangCounty",
}

export default defineComponent({
  components:{
    Loading,
  },
  props: {
    msg: String,
  },
  setup(){
    //測試
    const isloading = ref(true)
    const data = ref<any>({})
    const location = ref({})
    getTourismDataByCity(City.NewTaipei,200)?.then(async(r:any)=>{
      data.value =await r.data
      console.log(r.data)
      location.value =await r.data[0].Position
      isloading.value = false
    })
    return{ 
      data,location,isloading
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
