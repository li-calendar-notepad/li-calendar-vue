<script setup>
import StipulateTemplate from "./common/stipulateTemplate.vue";
import apiItem from "../../api/item";
import { reactive, ref } from "@vue/reactivity";
import { Aim,Tools,Histogram } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import CalendarSetting from './Setting.vue'
import StatisticalCharts from "./StatisticalCharts.vue"

const settingShow=ref(false)
const statisticalChartsDialogShow=ref(false)
const $router=useRouter()
const props=defineProps({
  calendarInfo:{
    type:Object,
    default:{
      // title:"我的日记",
      // description:"我是一个描述的内容，我是一个描述的内容，",
      // firstEventTime:"2022-10-03 11:21",
      // LastEventTime:"2022-10-03 11:21",
      // createTime:"2022-10-03 11:21",
    }
  },
  itemId:{},
  visitToken:{},
})

const summaryData=ref({
  eventCount: 0,
  firstEventStartTime: "",
  lastEventStartTime: "",
  subjectCount: 0,
})

const aimClick=(time)=>{
  $router.push({"path":"",query:{"itemId":props.itemId,"time":time}})
  // console.log("ssssssss",time)
}

apiItem.setVisitToken(props.visitToken)
apiItem.getSummaryData(props.itemId,(d)=>{
  summaryData.value=d
  // summaryData.eventCount=d.eventCount
  // summaryData.firstEventStartTime=d.firstEventStartTime
  // summaryData.lastEventStartTime=d.lastEventStartTime
  // summaryData.subjectCount=d.subjectCount
})

</script>

<template>
  <div>
    <StipulateTemplate :title="calendarInfo.title">
      <el-button type="primary" :icon="Tools" size="small" @click="settingShow=true">管理</el-button>
      <el-button type="primary" :icon="Histogram" size="small" @click="statisticalChartsDialogShow=true">统计</el-button>
      
      <div style="margin-top:20px" class="e-regular-text">{{calendarInfo.description}}</div>
      
      <el-divider border-style="dashed" />
      <div class="detalles">
        <!-- <div class="detalles-item">设置密码: <span>未设置</span></div> -->
        <div class="detalles-item e-disabled-text">{{$t('calendar.calendarInfo.createTime')}} <div class="detalles-item-content e-secondary-text">{{calendarInfo.createTime}}</div></div>
        
      <!-- </div>
      <div class="detalles"> -->
        
        <div class="detalles-item e-disabled-text">{{$t('calendar.calendarInfo.firstEventStartTime')}}<div class="detalles-item-content e-secondary-text">
          {{summaryData.firstEventStartTime ||$t('calendar.calendarInfo.none')}} 
          <!-- <el-icon v-if="summaryData.firstEventStartTime" class="event-aim" title="定位到日历" @click="aimClick(summaryData.firstEventStartTime)"><Aim /></el-icon> -->
          </div>
        </div>

        <div class="detalles-item e-disabled-text">{{$t('calendar.calendarInfo.lastEventStartTime')}}<div class="detalles-item-content e-secondary-text">
          {{summaryData.lastEventStartTime ||$t('calendar.calendarInfo.none')}} 
          <!-- <el-icon v-if="summaryData.lastEventStartTime" class="event-aim" title="定位到日历" @click="aimClick(summaryData.lastEventStartTime)"><Aim /></el-icon> -->
          </div>
        </div>
      </div>
      <!-- 事件数 -->
      <!-- 总天数 -->
      <!-- 主题数 -->
      <!-- 总事件数 -->
      <el-divider border-style="dashed" />
    </StipulateTemplate>
    
    <!-- 统计图表 -->
    <StatisticalCharts
      v-model:dialogShow="statisticalChartsDialogShow"
      :dialog="true"
      :item-id="4"
      :itemId="itemId"
      :visitToken="visitToken"
    ></StatisticalCharts>

    <!-- 日历设置 -->
    <CalendarSetting   :dialog="true" v-model:dialogShow="settingShow"  :itemId="itemId" :visitToken="visitToken" />
  </div>
  
</template>

<style scoped>
.detalles {
  /* margin-top: 50px; */
}

.detalles-item{
  color: #606266;
  font-size: 13px;
  margin-bottom: 20px;
}

.detalles-item-content{
  margin-left: 10px;
  margin-top: 5px;
}
.event-aim{
  color: var(--el-color-primary);
  cursor: pointer;
}
.event-aim:hover{
  color: var(--el-color-primary-dark-2);
}
</style>
