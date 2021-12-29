<template>
    <div class="hotelCard mb-3 me-3 me-lg-3">
        <div class="hotelCard-img col-12 col-lg-7">
            <img @click="gotItemPage(hotelData)" v-if="hotelData.Picture.PictureUrl1" class="w-100" :src="hotelData.Picture.PictureUrl1" :alt="hotelData.Picture.PictureDescription1">
            <img v-else src='../../assets/images/defaultImg.png' alt="作者無提供照片">
        </div>
        <div class="hotelCard-content col-12 col-lg-5 p-3">
            <header class="hotelCard-header">
                    <p class="hotelName">{{hotelData.HotelName}}</p>
                  <span :class="[{'collect':collected},{'disCollect':!collected},]" @click="selected('hotel',hotelData.HotelID,hotelData)"></span>
            </header>
            <p>{{hotelData.Address}}</p>
            <footer class="hotel-footer w-100">
              <div class="phone ps-2 ps-lg-0"><i class="bi bi-telephone-forward-fill"></i><i>{{hotelData.Phone}}</i></div>
              <div class="hotel-more mt-2">
                <button type="button" class="cusButton btn " @click="gotItemPage(hotelData)">more</button>
              </div>
            </footer>
        </div>
</div>
    
 
</template>

<script lang="ts">
import {defineComponent,onMounted,ref} from 'vue'
import { useRouter } from 'vue-router';
export default defineComponent({
    props:{
        hotelData:{
            type: Object,
            default: {}
        }
    },
    setup({hotelData}){
        onMounted(()=>{
        //判斷local中的收藏id是否符合本卡id，若是，就顯示true
        if(localStorage.getItem(hotelData.ID)){
            collected.value = true
        }else{
            collected.value = false
        }
        })
        const router = useRouter()
        const localStorage = window.localStorage
        const collected =ref(false)
    function selected(category:string,id:string,data:any) {
      collected.value = !collected.value
      if(collected.value == true){
        localStorage.setItem(id,JSON.stringify(data))
        if(!localStorage.getItem(`${category}CollectList`)){ //清單不存在的時候
          //建立清單
          localStorage.setItem(`${category}CollectList`,`${id}#`) //用陣列把ID存進去
        }else{  //清單存在的時候
          //增加ID
             let temp = localStorage.getItem(`${category}CollectList`) as string
             temp = `${temp}${id}#`
             localStorage.setItem(`${category}CollectList`,temp)
        }
      }else{
        localStorage.removeItem(id)
        if(localStorage.getItem(`${category}CollectList`)){ //把清單裡面的ID排除
          let temp = localStorage.getItem(`${category}CollectList`) as string
          let dataList = temp.split('#')
          console.log("清單",dataList)
          temp = "" //原本清單規0
          dataList.find((i,index)=>{ //找到該ID，刪除
          console.log(i)
            if(i ===id){
              console.log("找到這個ID名稱")
              dataList[index] = ""
            }
          })
          console.log("刪除後的清單清單",dataList)
          dataList.forEach((i:string)=>{ //再加回去清單中
            if(i!==""){
              temp+=`${i}#`
            }
          }) 
          console.log("新的清單",temp)
          localStorage.setItem(`${category}CollectList`,temp)
        }
      }
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
            //data
            collected,
            //mathods
            selected,gotItemPage,
        }
    }
})
</script>