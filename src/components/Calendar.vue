<template>
    <v-date-picker v-model="dateRange" is-range />
    <p>開始日期{{dateRange.start.toLocaleDateString()}}</p>
    <p>結束日期{{dateRange.end.toLocaleDateString()}}</p>
    <p>一共規劃:{{selectedDays}}天</p>
    <button data-bs-toggle="modal" data-bs-target="#editScheduleModal" @click="checkSelectDays">儲存</button>
    <!-- Modal -->
    <div class="modal fade" id="editScheduleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">建立行程規劃</h5>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">行程名稱</span>
                        <input type="text" class="form-control" placeholder="ex:我的小資台北二日遊" aria-label="Username" aria-describedby="basic-addon1" v-model="scheduleTitle">
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">行程簡述</span>
                        <textarea class="form-control" aria-label="With textarea" placeholder="ex:享受一個人的時光~" v-model="scheduleDscription"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="storageDate" data-bs-dismiss="modal">去排行程</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref,watch} from 'vue'
import { Calendar, DatePicker } from 'v-calendar';
import {Week,DateRange} from '../types/gloable';
import { useStore } from 'vuex';
export default defineComponent({
    components:{
        Calendar,
        DatePicker,
    },
    emits:[
        'goToSchedule'
    ],
      //toLocaleDateString() -->2021/12/12
      //getDay()-->返回數字，0代表星期天
      // console.log(Week[dateRange.value?.start.getDay()])
    setup(props,{emit}){
        const store = useStore()
        //選擇的日期，儲存於localStorage中
        const dateRange = ref<DateRange>({
            start:new Date,
            end:new Date,
        })
        const selectedDays = computed(()=>{
            return caculateDay(dateRange.value?.end.toLocaleDateString(),dateRange.value?.start.toLocaleDateString())
        })
        const localstorage = window.localStorage
        const scheduleTitle = ref("旅遊清單")
        const scheduleDscription = ref("尚無描述")
        const myModal = document.getElementById('#editScheduleModal')
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
        function checkSelectDays () {
            if(selectedDays.value>5){
                 alert("大冒險最多只能玩5天唷~")
            }
        }
        function storageDate() {
            if(selectedDays.value>5){
                alert("大冒險最多只能玩5天唷~")
            }else if(selectedDays.value<=0){
                alert("得先安排遊玩日期唷~")
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
                    "scheduleTitle":scheduleTitle.value,
                    "scheduleDscription":scheduleDscription.value,
                    "selectDate":selectDayList,
                    "selectWeek":weekList,
                }))
                store.commit('MyCollection/getSchdulelist')
                emit('goToSchedule')
            }
        }
        return{
            //data
            dateRange,selectedDays,scheduleTitle,scheduleDscription,
            //methods
            checkSelectDays,storageDate,
        }
    }
})
</script>