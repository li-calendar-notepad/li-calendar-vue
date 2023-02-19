<script setup>
import { onMounted ,onUnmounted,reactive,ref} from 'vue'
import moment from 'moment'


import Calendar from '../components/Calendar.vue'
import Edialog from '../components/Edialog.vue'
import Etip from '../components/Etip.vue'

import CalendarInfo from '../components/calendarTools/CalendarInfo.vue'
import CalendarSetting from '../components/calendarTools/Setting.vue'
import CalendarSubject from '../components/calendarTools/Subject.vue'
import CalendarSearch from '../components/calendarTools/Search.vue'


import EventEdit from '../components/calendarTools/EventEdit.vue'
import EventInfo from '../components/calendarTools/EventInfo.vue'
import {Expand,Plus } from "@element-plus/icons-vue";


import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter,useRoute } from "vue-router";

import apiItem from "../api/item";
import apiEvent from "../api/event";
import apiStyle from "../api/style";
import apiSpecialDay from "../api/specialDay";


import cmn from "../utils/cmn";


const $router = useRouter(); 
const $route = useRoute(); 
const $i18n=useI18n()
const iconSize=27
const styleConfig=ref()
const asideMenu=[
  {
    icon:"Calendar",
    action:"info",
    title:$i18n.t("calendar.toolbar.info")
  },
  // {
  //   icon:"Operation",
  //   action:"setting",
  //   title:$i18n.t("calendar.toolbar.setting")
  // },
  {
    icon:"Paperclip",
    action:"subject",
    title:$i18n.t("calendar.toolbar.subject")
  },
  {
    icon:"Share",
    action:"share",
    title:$i18n.t("calendar.toolbar.share")
  },
  {
    icon:"Search",
    action:"search",
    title:$i18n.t("calendar.toolbar.search")
  },
  // {
  //   icon:"CirclePlus",
  //   action:"eventEdit",
  //   title:$i18n.t("calendar.toolbar.subject")
  // },

];
const viewWidth=ref(document.documentElement.clientWidth||document.body.clientWidth);
const containerShow = ref(false)
const itemInfo =ref({})
const visitToken=ref("")
const actionTab = ref("info")
const editEventShow=ref(false)
const eventEditTitle=ref("")
const calendarObj=ref()
const updateEventId=ref(0)
const eventEditObj=ref()
const eventInfoRef=ref()
const initComplete=ref(false)// 初始化完成
const asidePage=ref(true)// 左侧边页
const drawerAsidePageShow=ref(false)

const drawerSize=ref(350)// 抽屉尺寸
const styleText=ref()
const calendarLoad=ref(false)
const calendarConfig=reactive({
  firstDay:7,
  monthViewMaxEvent:true,
  weekNumbers:0,
  displayEventTime:null,
  displayEventEnd:null,
})





// 注入样式标签
apiStyle.getStyleText(null,(html)=>{
  styleText.value=`<style>${html}</style>`
})


// 加载事件
const calendarEvents=(info, successCallback, failureCallback)=>{
  if(itemInfo.value.itemId){
    apiEvent.getListAndSpecialDayByTimeScope(itemInfo.value.itemId,info.startStr,info.endStr,(d)=>{
      const events=[]
      for (let i = 0; i < d.events.length; i++) {
        const element = d.events[i];
        let allDay=false
        if(element.allDay!=1){
           if(element.startTime.slice(11,19)=="00:00:00"&&element.startTime.slice(11,19)==element.endTime.slice(11,19)){
            allDay=true
          }
        }
        
        events.push({
          id:element.eventId,
          eventId:element.eventId,
          title:element.title,
          start:element.startTime,
          end:element.endTime,
          allDay:allDay,
          content:element.content,
          className:element.className,
        })
      }
      
      if (d.specialDays){
        for (let i = 0; i < d.specialDays.length; i++) {
          const element = d.specialDays[i];
          // var color = styleConfig.value.specialDayHolidayBackgroundColor // 取消单独设置假日颜色
          var color ="none"
          const event = {
            display: "background",
            title: element.note,
            color: color,
            start: element.startTime,
            end: element.endTime,
            className: "special-day-holiday",
            SpecialType: element.type
          }
          // 普通日子，但是有注释
          if (element.type == 1) {
            event.color = "#fff"
            event.className = "special-day"
          }
          if (!styleConfig.value.specialDayTextDisplay){
            event.title = ""
          }
          events.push(event)
        }
      }
      successCallback(events)
    })
  }
  
}


// 开始运行
const startRun=()=>{
  apiEvent.setVisitToken(visitToken.value)
  apiItem.getPrivateInfo(Number($route.query.itemId),(d)=>{
    // 配置转换
    styleConfig.value=d.styleConfig
    calendarConfig.firstDay=styleConfig.value.weekStartDay
    // calendarConfig.firstDay=styleConfig.value.dayTimeDisplayMode
    // calendarConfig.firstDay=styleConfig.value.holidayBackgroundColor
    calendarConfig.monthViewMaxEvent=(styleConfig.value.monthViewMaxEvent=="")?true:Number(styleConfig.value.monthViewMaxEvent)
    calendarConfig.weekNumbers=Number(styleConfig.value.weekNumbers)
    switch (styleConfig.value.dayTimeDisplayMode) {
      case 1:
        calendarConfig.displayEventTime=true
        calendarConfig.displayEventEnd=true
        // console.log("显示模式",1)
        break;
      
      case 2:
        calendarConfig.displayEventTime=true
        calendarConfig.displayEventEnd=false
        // console.log("显示模式",2)
        break;
      case 3:
        calendarConfig.displayEventTime=false
        calendarConfig.displayEventEnd=false
        // console.log("显示模式",3)
        break;

      default:
        
        break;
    }
    // 基本内容加载完成
    initComplete.value=true
    containerShow.value=true
    calendarLoad.value=true// 加载日历
    itemInfo.value=d
    // calendarLoad
    calendarRefetchEvents()

    
  })
}

// 事件默认值
const defaultEventInfo=reactive({
  title:"",
  content:"",
  startTime:"",
  endTime:"",
  style:"",
  remind:"",
  eventId:""
})


const etipVisible=ref(false)
const eventEtipRef=ref()

// 悬浮显示内容
const eventEtipContent = reactive({
  title:"",
  content:"",
  tag: "",
  time: "",
})

// 鼠标进入
const calendarEventMouseEnter=(arg)=>{
  const event=arg.event
  eventEtipContent.time=cmn.startAndEndTimeFormatShort(event.startStr,event.endStr);
  eventEtipContent.title=event.title
  if ( event.display=="background"){
    eventEtipContent.tag="特殊的日期"
    if (event.extendedProps.SpecialType==2){
      eventEtipContent.tag+="-假期"
    }
  }else{
    eventEtipContent.tag=""
  }
  eventEtipRef.value.show()
}

const calendarEventMouseLeave=()=>{
  eventEtipRef.value.hide()
}


// 进入页面获取详情
// 如果需要密码则需要进行输入验证获取token
// 所有操作将根据token来修改等操作
apiItem.getInfoByItemId(Number($route.query.itemId),(d)=>{
  // itemInfo.value=d
  if(d.requirePassword==true){
    // 需要密码
    ElMessageBox.prompt( $i18n.t('calendar.password_box.text',{itemTitle:d.title}), $i18n.t('calendar.password_box.title'), {
      confirmButtonText: $i18n.t('calendar.password_box.confirmButtonText'),
      cancelButtonText: $i18n.t('calendar.password_box.cancelButtonText'),
      inputType:"password",
      inputPattern:/^[0-9a-zA-Z]{1,20}$/,
      inputErrorMessage: $i18n.t('calendar.common.itemVisitPasswordError'),
      closeOnClickModal:false,
      distinguishCancelAndClose: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          apiItem.checkVisitPassword(Number($route.query.itemId),instance.inputValue,(dd)=>{
            visitToken.value=dd.visitToken
            apiItem.setVisitToken(dd.visitToken)
            instance.confirmButtonLoading = false
            done()
          },()=>{
            instance.confirmButtonLoading = false
          })
        } else if(action === 'cancel'){
          // 忘记密码
          cmn.confirm($i18n.t("calendar.other.findPassword"), $i18n.t("calendar.other.findPasswordByEmail"), (res) => {
            if (res) {
              apiItem.forgotVisitPassword($route.query.itemId, (d) => {
                ElMessage.success($i18n.t("calendar.other.findPasswordSendEmailSuccess"))
              })
            }
          })
        } else {
          done()
        }
      }
    })
    .then(({ value }) => {
      // 密码正确
      startRun()
    })
    .catch(() => {
      if (window.history.length <= 1) {
          $router.push({path:'/home'})
          return false
      } else {
          $router.go(-1)
      }
      // ElMessage({
      //   type: 'info',
      //   message: '取消',
      // })
    })
  }else{
    // 不需要密码
    startRun()
  }
})


// 选择空日历
const handleDateSelect=(selectInfo)=>{
    // display=true
    // dialogShow.value=true
  // console.log("选择内容",selectInfo)
  defaultEventInfo.title=""
  defaultEventInfo.className=""
  defaultEventInfo.startTime=moment(selectInfo.startStr).format('YYYY-MM-DD HH:mm:ss');
  defaultEventInfo.endTime=moment(selectInfo.endStr).format('YYYY-MM-DD HH:mm:ss');
  // editEventOpen(defaultEventInfo)
  eventEditObj.value.addEvent(itemInfo.itemId,defaultEventInfo)
}

// 事件被单击
const handleEventClick= (clickInfo)=> {
  const eventInfo=clickInfo.event
  // console.log(eventInfo)
  eventInfoRef.value.renderByEventId(itemInfo.value.itemId,eventInfo.id)
  // eventEditObj.value.editEvent(itemInfo.value.itemId,eventInfo.id)
}

const calendarRefetchEvents=()=>{
  calendarObj.value.refetchEvents()
}

// 打开添加事件
const addEvent=()=>{
  eventEditObj.value.addEvent(itemInfo.value.itemId)
}

// 更新事件
const updateEvent=(info)=>{
  const event = info.event
  let endTime = event.end
  if (!endTime){
    if(event.allDay){
      // 全天
      endTime = moment(event.start).add(1, "days")
    }else{
      endTime = moment(event.start).add(1, "hours")
    }
  }
  // console.log("拖动更新", event)
  const updateEvent={
    eventId:Number(event.id),
    startTime:moment(event.start).format("YYYY-MM-DD HH:mm:ss"),
    endTime: moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
    title:event.title,
    content:event.extendedProps.content,
  }
  if(event.classNames[0]){
    updateEvent.className=event.classNames[0]
  }
  // console.log("拖动更新后", updateEvent)
  apiEvent.updateByEventId(itemInfo.value.itemId,updateEvent,()=>{
    return false
  })
}

const calendarEventDrop=(arg)=>{
  updateEvent(arg)
  // console.log("calendarEventDrop",arg)

}

const calendarEventResize=(arg)=>{
  updateEvent(arg)
  // console.log("calendarEventResize",arg)
  
}

const calendarLoading=(isLoading, index)=>{
  // console.log("加载",isLoading)
}

// 外部元素
const calendarEventReceive=(info)=> {
  // console.log("外部元素",info)
  const className=info.draggedEl.attributes.styleClass.value;
  const event={
    title:info.event.title+" ",
    className:className,
    startTime:moment(info.event.startStr).format("YYYY-MM-DD HH:mm:ss"),
    allDay:info.event.allDay
    // content:event.extendedProps.content,
  }

  if(info.event.startStr.length==10){
    event.endTime=moment(info.event.startStr).add(1,"days").format("YYYY-MM-DD HH:mm:ss")
  }else{
    event.endTime=moment(info.event.startStr).add(1,"hours").format("YYYY-MM-DD HH:mm:ss")
  }

  apiEvent.createOne(itemInfo.value.itemId,event,()=>{
    calendarRefetchEvents()
    return false
  })
  info.revert()// 阻止事件

}


// 事件内容
const calendarEventContent=(arg)=>{
  // console.log("参数",arg)
  let eventTitle="";
  let dotHtml=""
  let displayTimeClass=""
  // 状态小圆点
  // dotHtml=`<div class="event-dot-box"><span class="event-dot"></span></div>`
  const event=arg.event

  // 内容图标标记
  if (!event.display || event.display!="background"){
    if (event.extendedProps.content != "") {
      eventTitle += `<svg style="width:.85em;stroke-width:.5" text="stroke-width:.5" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"></path></svg>`
      // eventTitle=`<span style="line-height:21px">${eventTitle}</span>`
    }
  }
  eventTitle+=" "+event.title
  if (styleConfig.value.dayTimeDisplayMode==3){
    displayTimeClass="e-display-none"
  }
  return  { html: `
			<div class="fc-event-main-frame">
				<div class="fc-event-time ${displayTimeClass}">${arg.timeText}</div>
				<div class="fc-event-title-container">
					<div class="fc-event-title fc-sticky">${dotHtml} ${eventTitle}</div>
				</div>
			</div>` }

}


const onWindowResize=()=>{
  // window.screenWidth=document.body.clientWidth;
  viewWidth.value=document.body.clientWidth;
  // console.log("页面宽度",viewWidth.value)

  cmn.sizeChangeWithObj(viewWidth.value,{
    xs:()=>{
      // console.log("手机尺寸")
      drawerSize.value="100%"
      asidePage.value=false
      
    },
    sm(){
      asidePage.value=false
      drawerSize.value=450
    },
    md(){
      asidePage.value=false
      drawerSize.value=450
    },
    lg(){
      asidePage.value=true
      drawerSize.value=450
    },
    xl(){
      asidePage.value=true
      drawerSize.value=450
    },
  })
}




onMounted(()=>{
  onWindowResize()
  //监听窗口变化
  window.addEventListener('resize',onWindowResize)

})

onUnmounted(()=>{
  window.removeEventListener('resize',onWindowResize)
})
</script>

<template>
<div style="height:100%">

  



<span v-html="styleText"></span>
  <el-container v-if="containerShow" style="height:100%">
    <!-- 抽屉版本 -->
    <el-drawer v-model="drawerAsidePageShow" v-if="!asidePage" direction="ltr" :size="drawerSize" title="I am the title" style="overflow:hidden" :with-header="false">
      <el-Header style="padding:10px;line-height:60px;display:flex">
        <div style="display:flex;align-items: center;">
          <el-icon :size="iconSize" style="margin-left:20px;cursor: pointer;" class="e-regular-text" :title="iconInfo.title" :style="(actionTab==iconInfo.action)?{color : 'var(--el-color-primary)'}:{}" v-for="(iconInfo, index) in asideMenu" :key="index">
            <component  :is="iconInfo.icon" style="width: 30px; height:30px;" @click="actionTab=iconInfo.action">
              <!-- <el-icon :size="iconSize" style="margin-left:10px"> -->
                
            </component>
          </el-icon>
          <!-- 添加事件 -->
          <!-- <el-icon :size="iconSize" style="margin-left:20px;cursor: pointer;" :title="$t('calendar.toolbar.subject')" @click="addEvent">
            <CirclePlus/>
          </el-icon> -->
        </div>

        <div style="display:flex;margin-left:auto;align-items: center;">
          <el-button-group >
            <el-button type="danger" @click="drawerAsidePageShow=false" text bg icon="close" />
          </el-button-group>
        </div>
      </el-Header>

      <el-main v-if="initComplete"  style="height:calc(100% - 80px)">
        <div style="height:calc(100% - 100px)">
          <CalendarInfo     v-if="actionTab=='info'" :itemId="itemInfo.itemId" :visitToken="visitToken" :calendarInfo="itemInfo" />
          <CalendarSetting  v-else-if="actionTab=='setting'" :itemId="itemInfo.itemId" :visitToken="visitToken"/>
          <CalendarSubject  v-else-if="actionTab=='subject'" :itemId="itemInfo.itemId" :visitToken="visitToken"/>
          <CalendarSearch  v-else-if="actionTab=='search'" :itemId="itemInfo.itemId" :visitToken="visitToken"/>
          <div v-else>- Unidentified {{actionTab}} -</div>
          <!-- <button @click="testButton">测试安阿牛</button> -->
        </div>
      </el-main>
    </el-drawer>
    <!-- 侧边页面本部 -->
    <el-aside width="350px" v-if="asidePage" style="border-right: 1px solid #e1e1e1;">
      <el-container style="height:100%" >
        <el-Header style="padding:10px;line-height:60px">
          <el-icon :size="iconSize" class="e-regular-text" style="margin-left:20px;cursor: pointer;" :title="iconInfo.title" :style="(actionTab==iconInfo.action)?{color : 'var(--el-color-primary)'}:{}" v-for="(iconInfo, index) in asideMenu" :key="index">
            <component  :is="iconInfo.icon" style="width: 30px; height:30px;" @click="actionTab=iconInfo.action">
              <!-- <el-icon :size="iconSize" style="margin-left:10px"> -->
                
            </component>
          </el-icon>
          <!-- 添加事件 -->
          <el-icon :size="iconSize" class="e-regular-text" style="margin-left:20px;cursor: pointer;" :title="$t('calendar.toolbar.subject')" @click="addEvent">
            <CirclePlus/>
          </el-icon>
        </el-Header>

        <el-main v-if="initComplete">
          <div style="height:calc(100% - 120px)">
            <CalendarInfo     v-if="actionTab=='info'" :itemId="itemInfo.itemId" :visitToken="visitToken" :calendarInfo="itemInfo" />
            <CalendarSetting  v-else-if="actionTab=='setting'" :itemId="itemInfo.itemId" :visitToken="visitToken"/>
            <CalendarSubject  v-else-if="actionTab=='subject'" :itemId="itemInfo.itemId" :visitToken="visitToken"/>
            <CalendarSearch  v-else-if="actionTab=='search'" :itemId="itemInfo.itemId" :visitToken="visitToken"/>
            
            <div v-else>- Unidentified {{actionTab}} -</div>
            <!-- <button @click="testButton">测试安阿牛</button> -->
          </div>
          
        </el-main>

        
        
      </el-container>
    </el-aside>

    <!-- 日历主内容 -->
    <el-main>
        <Calendar v-if="calendarLoad" ref="calendarObj" 
        initialView="dayGridMonth" 
        :events="calendarEvents"
        @onDateSelect="handleDateSelect" 
        :eventClick="handleEventClick" 
        :eventDrop="calendarEventDrop" 
        :eventResize="calendarEventResize" 
        :eventMouseEnter="calendarEventMouseEnter" 
        :eventContent="calendarEventContent" 
        :editable="true"
        :selectable="true"
        :loading="calendarLoading" 
        :eventReceive="calendarEventReceive"
        :nowIndicator="true"
        :eventMouseLeave="calendarEventMouseLeave"
        :firstDay="calendarConfig.firstDay"
        :dayMaxEvents="calendarConfig.monthViewMaxEvent"
        :weekNumbers="calendarConfig.weekNumbers"
        :displayEventTime="calendarConfig.displayEventTime"
        :displayEventEnd="calendarConfig.displayEventEnd"
        height="100%"
        />
      <!-- </div> -->
    </el-main>
  </el-container>
  
  <!-- 事件悬浮提示 -->
  <Etip ref="eventEtipRef" width="300px" v-model:visible="etipVisible" :showAfter="0" :autoClose="3000" :showArrow="false">
    <div v-if="eventEtipContent.tag">{{ eventEtipContent.tag}}</div>
    <div v-if="eventEtipContent.time">{{eventEtipContent.time}}</div>
    <div v-if="eventEtipContent.title">{{eventEtipContent.title}}</div>
    <div>{{eventEtipContent.content}}</div>
  </Etip>
  <!-- 左侧抽屉按钮 -->
  <!-- <el-affix :offset="120" v-if="!asidePage"  position="bottom">
    <el-button type="primary" style="margin:20px" @click="drawerAsidePageShow=true" :icon="Expand" circle />
  </el-affix> -->
  <div class="float-buttons" v-if="!asidePage">
    <div><el-button type="primary" size="small" @click="addEvent" :icon="Plus" /></div>
    <div style="margin-top: 5px;"><el-button type="primary" @click="drawerAsidePageShow=true" size="small" :icon="Expand" /></div>
  </div>

  <!-- 事件编辑弹窗 -->
  <EventEdit 
  ref="eventEditObj"
  :itemId="itemInfo.itemId" 
  :title="eventEditTitle" 
  :dialog="true" 
  :defaultData="defaultEventInfo" 
  v-model:dialogShow="editEventShow" 
  :visitToken="visitToken"
  :dialogFullScreen="false"
  @addAfter="calendarRefetchEvents"
  @updateAfter="calendarRefetchEvents"
  
    />

  <EventInfo 
  ref="eventInfoRef"
  :visitToken="visitToken"
  :dialog="true" 
  @addAfter="calendarRefetchEvents"
  @updateAfter="calendarRefetchEvents"
  @deleteAfter="calendarRefetchEvents"
      />
</div>

</template>

<style>
.calendar-body{
  overflow: hidden;
  /* padding-top: 20px; */
  border: #D4D7DE solid 1px;
  /* display: flex; */
  height: 100%;
  /* width: 100%; */
}

/* 
无边框的情况，边框将使用背景色
字体颜色修改需要新建类 xxx .fc-event-main{color:red}
*/

.fc .fc-button{
  font-size: 13px;
}

.event-dot {
    /* margin-bottom: 1px; */
    display: inline-block;
    width: 8px;
    height: 8px;
    border: 1px solid #ffffff;
    background-color: #ff7349;
    /* border: calc(var(--fc-list-event-dot-width, 6px) / 2) solid var(--fc-event-border-color, #ff7349); */
    border-radius: 50%;
    /* border-radius: calc(var(--fc-list-event-dot-width, 6px) / 2); */
}

.event-dot-box{
  display: inline-block;
}

.float-buttons {
  /* background: #1a59b7; */
  /* color: #ffffff; */
  overflow: hidden;
  z-index: 1;
  position: fixed;
  /* height: 100px; */
  left: 70px;
  bottom: 80px;
}

/* 强制更改块背景色 */
/* .fc-event-future.special-day{
  background-color:black!important;
} */

/* 更改块文字颜色 */
/* .fc-event-future.special-day{
  color:red;
} */
</style>