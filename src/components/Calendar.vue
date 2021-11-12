<template>
    <v-date-picker v-model="dateRange" is-range />
    <p>開始日期{{dateRange.start.toLocaleDateString()}}</p>
    <p>結束日期{{dateRange.end.toLocaleDateString()}}</p>
    <p>一共規劃:{{selectedDays}}天</p>
    <button @click="storageDate">儲存</button>
</template>

<script lang="ts">
import {computed, defineComponent, ref,watch} from 'vue'
import { Calendar, DatePicker } from 'v-calendar';
import {Week,DateRange} from '../types/gloable'
export default defineComponent({
    components:{
        Calendar,
        DatePicker,
    },
      //toLocaleDateString() -->2021/12/12
      //getDay()-->返回數字，0代表星期天
      // console.log(Week[dateRange.value?.start.getDay()])
    setup(){
        //選擇的日期，儲存於localStorage中
        const dateRange = ref<DateRange>({
            start:new Date,
            end:new Date,
        })
        const selectedDays = computed(()=>{
            return caculateDay(dateRange.value?.end.toLocaleDateString(),dateRange.value?.start.toLocaleDateString())
        })
        const localstorage = window.localStorage
        watch(dateRange,()=>{
            // console.log("選擇的起始日星期",Week[dateRange.value?.start.getDay()])
            // console.log("選擇的結束日期",Week[dateRange.value?.end.getDay()])
            if(selectedDays.value>5){
                alert("大冒險最多只能玩5天唷~")
            }
          
        })
        function randomNum (min:number,max:number):number {
            return Math.round(((Math.random()*(max-min)+min)))
        }
        function getDateBetween(start:string, end:string) {
            let result = [];
            //使用传入参数的时间
            let startTime = new Date(start) as any;
            let endTime = new Date(end) as any;
            while (endTime - startTime >= 0) {
                let year = startTime.getFullYear();
                let month = startTime.getMonth();
                month = month<9?'0'+(month+1):month+1;
                let day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
                //加入数组
                result.push(year + "-" + month + "-" + day);
                //更新日期
                startTime.setDate(startTime.getDate() + 1);
            }
                return result;
        }
        function getDateObject (dateString:string):Date{
            let dateStringArr=dateString.split('-')
            let temp = new Date(parseInt(dateStringArr[0]),parseInt(dateStringArr[1]),parseInt(dateStringArr[2]))
        //    console.log(Week[temp.getDay()])
           return temp
        }
         function getDayListWeek (dayList:Array<string>):Array<string>{
            let weekList = new Array
            weekList =dayList.map((i)=>{
                // console.log("轉換星期",Week[getDateObject(i).getDay()])
                return Week[getDateObject(i).getDay()]
            })
            return weekList
        }
        function caculateDay (sDate1:string,sDate2:string):number {
                let oDate1 = new Date(sDate1) as any;
                let oDate2 = new Date(sDate2) as any;
                let iDays = Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24; // 把相差的毫秒數轉換為天數
                return iDays+1;
        }
        function getRandomScheduleListID () {
            let num1 = randomNum(1,1000)
            let num2 = randomNum(0,100)
            return "s-"+(num1+num2)
        }
        function storageDate() {
            if(selectedDays.value>5){
                alert("大冒險最多只能玩5天唷~")
            }else{
                let selectDayList = getDateBetween(dateRange.value?.start.toLocaleDateString(),dateRange.value?.end.toLocaleDateString())
                let weekList = getDayListWeek(selectDayList)
                let scheduleListID = getRandomScheduleListID()
                if(!localstorage.getItem('scheduleListIDMap')){ //沒有建立過清單時，先建立
                    localstorage.setItem('scheduleListIDMap',scheduleListID+"#")
                }else{
                    let ControlArray = localstorage.getItem('scheduleListIDMap')
                    localstorage.setItem('scheduleListIDMap',`${ControlArray}${scheduleListID}#`)
                }
                localstorage.setItem(scheduleListID,JSON.stringify({
                    "selectDate":selectDayList,
                    "selectWeek":weekList,
                }))
            }
        }
        return{
            //data
            dateRange,storageDate,selectedDays,
        }
    }
})
</script>