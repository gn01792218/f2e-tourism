<template>
  <div class="activityCard card mb-3">
    <div class="activityCard-img">
      <img class="w-100 h-100" @click="gotItemPage(activityData)" v-if="activityData.Picture.PictureUrl1" :src="activityData.Picture.PictureUrl1" :alt="activityData.Picture.PictureDescription1">
      <img class="h-100" v-else src='../../assets/images/defaultImg.png' alt="作者無提供照片">
    </div>
    <div class="activityCard-content p-2">
      <header class="activityCard-header">
        <p class="activitiName">{{activityData.ActivityName}}</p>
      </header>
      <footer class="activityCard-footer position-relative">
        <div class="topInfo">
          <div class='d-flex'>
            <i class="bi bi-geo-alt-fill"></i>
            <p v-if="activityData.Location">{{activityData.Location}}</p>
            <p class="scene-city" v-else>猜猜我在哪</p>
          </div>
          <p>{{activityData.Organizer}}</p>
        </div>
          <p>舉辦時間{{dateFormat(activityData.StartTime)}}</p>
          <div class="position-absolute top-0 end-0" :class="[{'collect':collected},{'disCollect':!collected}]" @click="selected('ActivityID',activityData.ActivityID,activityData)"></div>
      </footer>
        <button type="button" class="cusButton btn" @click="gotItemPage(activityData)">more</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,onMounted,ref} from 'vue'
import { useRouter } from 'vue-router';
export default defineComponent({
    props:{
        activityData:{
            type: Object,
            default: {}
        }
    },
    setup({activityData}){
     onMounted(()=>{
        //判斷local中的收藏id是否符合本卡id，若是，就顯示true
        if(localStorage.getItem(activityData.ActivityID)){
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
          // console.log("清單",dataList)
          temp = "" //原本清單規0
          dataList.find((i,index)=>{ //找到該ID，刪除
          console.log(i)
            if(i ===id){
              // console.log("找到這個ID名稱")
              dataList[index] = ""
            }
          })
          // console.log("刪除後的清單清單",dataList)
          dataList.forEach((i:string)=>{ //再加回去清單中
            if(i!==""){
              temp+=`${i}#`
            }
          }) 
          // console.log("新的清單",temp)
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
    function dateFormat(dateStr:string):string{
      let weekList = ["(日)","(一)","(二)","(三)","(四)","(五)","(六)"]
      let temp = new Date(dateStr)
      let year = temp.getFullYear()
      let mon = (temp.getMonth()+1)
      let day = pad(temp.getDate())
      let week = weekList[temp.getDay()]
      return year+'.'+mon+'.'+day+week
    }
    function pad(num:number):string{
      console.log(num)
      return num<10?'0'+num as string:num as unknown as string
    }
        return{
            //data
            collected,
            //mathods
            selected,gotItemPage,dateFormat
        }
    }
})
</script>