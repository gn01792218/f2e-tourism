<template>
        基隆活動
        {{active}}
        {{location}}
        <div class="d-md-flex flex-md-wrap">
           <Card class="me-md-5"
          v-for="(item,index) in data" :key="index"
          :imgSrc="item.Picture?.PictureUrl1"
          :imgAlt="item.picture?.PictureDescription1"
          :title="item.Name"
          :description="item.DescriptionDetail"
          :openTime="item.OpenTime"
        />
        </div>
       
      <Loading v-if="isloading"/>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import {getTourismDataByCity,getRestaurantByCity,getAllHotel,getHotelByCity,getAllActivity,getActivityByCity} from '../api'
import Card from '../components/Card.vue'
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
    Loading,Card
  },
  props: {
    msg: String,
  },
  setup(){
    //測試
    const isloading = ref(true)
    const data = ref<any>({})
    const location = ref({})
    const eat = ref({})
    const hotel = ref({})
    const active = ref({})
    // getAllHotel()?.then((r:any)=>{
    //   hotel.value = r.data
    //   console.log(r.data)
    // })
    // getAllActivity(12)?.then((r=>{
    //   active.value = r.data
    //   console.log(r.data)
    // }))
    getActivityByCity(City.LienchiangCounty)?.then((r:any)=>{
      active.value = r.data
      console.log(r.data)
    })
    getRestaurantByCity(City.NantouCounty)?.then((r:any)=>{
      eat.value = r.data
    })
    getHotelByCity(City.Keelung,10)?.then((r:any)=>{
      hotel.value = r.data
      console.log(r.data)
    })
    getTourismDataByCity(City.NewTaipei,10)?.then((r:any)=>{
      data.value =r.data
      console.log(r.data)
      location.value =r.data[0].Position
      isloading.value = false
    })
    return{ 
      data,location,isloading,eat,hotel,active
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
