<template>
<!-- 沒有填縣市的將會被自動排除!!!!! v-if="city"-->
  <div class="sceneCard row mb-3">
    <div class="sceneCard-img col-8">
      <img class="w-100" :src=sceneData.Picture.PictureUrl1 :alt=sceneData.Picture.PictureDescription1>
    </div>
    <div class="sceneCard-content col-6 p-4">
      <header class="sceneCard-header">
        <h3>{{sceneData.Name}}</h3>
        <span :class="[{'collect':collected},{'disCollect':!collected}]" @click="selected('scene',sceneData.ID,sceneData)"></span>
      </header>
      
      <p>{{sceneData.DescriptionDetail}}</p>
      <i class="bi bi-door-open-fill">{{sceneData.OpenTime}}</i>
      <div class="d-flex">
        <i class="bi bi-geo-alt-fill"></i>
        <i v-if="sceneData.City">{{sceneData.City}}</i>
        <i v-else>猜猜我在臺灣某處</i>
        <button type="button" class="btn btn-outline-success">more</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref , computed , watch} from 'vue';
export default defineComponent({
  props:{
    sceneData: {
      type: Object,
      default: {}
    },
  },
  setup({sceneData}){
    onMounted(()=>{
      //判斷local中的收藏id是否符合本卡id，若是，就顯示true
      if(localStorage.getItem(sceneData.ID)){
        collected.value = true
      }else{
        collected.value = false
      }
    })

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
    return{
      //data
      collected,
      //mathods
      selected,
    }
  }
});
</script>