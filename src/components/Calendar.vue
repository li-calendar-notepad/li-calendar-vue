<script setup>
  import { onMounted} from 'vue'

  import '@fullcalendar/core/vdom' // solves problem with Vite
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import momentPlugin from '@fullcalendar/moment'

  import listPlugin from '@fullcalendar/list';
  import interactionPlugin from '@fullcalendar/interaction';


  let calendar;

  // 定义事件
  const emit = defineEmits([
    'onDateSelect',
    'onEventClick',
  ])

  const onDateSelect=(selectInfo)=>{
    emit('onDateSelect',selectInfo)
  }

  const onEventClick=(selectInfo)=>{
    emit('onEventClick',selectInfo)
  }

  // 定义属性
  const props =defineProps({
    initialView:{
      type:String,
      default:"dayGridMonth",// dayGridMonth,timeGridWeek,listMonth,listYear
    },
    initialEvents:{},
    editable:{
      type:Boolean,
      default:true,
    },
    selectable:{
      type:Boolean,
      default:true,
    },
    selectMirror:{
      type:Boolean,
      default:true,
    },
    dayMaxEvents:{
      type:[Boolean,Number],
      default:true,
    },
    buttonText:{
      type:Object,
      default: {
        today: '今天',
        month: '月',
        week: '周',
        day: '天',
        listYear: '年览',
        listMonth: '月览',
        listWeek: '周览',
        listDay: '日览',
      },
    },
    locale:{
      type:String,
      default:"zh-cn"
    },
    events:{},
    eventClick:{},
    eventDrop:{},
    eventResize:{},
    dayCellContent:{},//修改日标题(arg) 例：26日
    eventMouseEnter:{},
    eventContent:{},
    eventClassNames:{},
    loading:{},
    drop:{},
    eventReceive:{},
    nowIndicator:{},
    displayEventTime:{},
    displayEventEnd:{},
    eventMouseLeave:{},
    height:{},
    firstDay:{},
    weekNumbers:{},
  })

  // 暴露出去的内容
  defineExpose({
    refetchEvents(){
      console.log("刷新")
      calendar.refetchEvents()
    }
  })


  onMounted(() => {

    calendar = new Calendar(document.getElementById("calendar"), {
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
        listPlugin,
        momentPlugin,
        // bootstrapPlugin,
      ],
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'today prev,next dayGridMonth,timeGridWeek,listMonth,listYear'
      },
      initialView:props.initialView,// 初始视图
      initialEvents: props.initialEvents, 
      editable: props.editable,
      selectable: props.selectable,
      selectMirror: props.selectMirror,
      dayMaxEvents: props.dayMaxEvents,
      weekends: true,
      locale:props.locale,
      select:onDateSelect,
      eventClick: props.eventClick,
      navLinks: true, // can click day/week names to navigate views
      buttonText: props.buttonText,
      expandRows: false,
      allDayText:"全天",
      events:props.events,
      eventDrop:props.eventDrop,
      eventResize:props.eventResize,
      dayCellContent:props.dayCellContent,
      eventMouseEnter:props.eventMouseEnter,
      eventMouseLeave:props.eventMouseLeave,
      eventContent:props.eventContent,
      loading:props.loading,
      drop:props.drop,
      eventReceive:props.eventReceive,
      nowIndicator:props.nowIndicator,
      eventClassNames:props.eventClassNames,
      displayEventTime: props.displayEventTime,
      displayEventEnd: props.displayEventEnd,
      height:props.height,
      moreLinkText:"更多",
      eventDisplay:"block",
      firstDay:props.firstDay,
      weekNumbers:props.weekNumbers,
      
    });


    // function handleDateSelect(selectInfo){
    //   console.log(22123213212)
    //   let title = prompt('Please enter a new title for your event')
    //   let calendarApi = selectInfo.view.calendar

    //   calendarApi.unselect() // clear date selection

    //   if (title) {
    //     calendarApi.addEvent({
    //       id: createEventId(),
    //       title,
    //       start: selectInfo.startStr,
    //       end: selectInfo.endStr,
    //       allDay: selectInfo.allDay
    //     })
    //   }
    // }

   

    calendar.render()

    calendar.on('dateClick', function(info) {
      // console.log('clicked on ' , info);
    });
  })



</script>

<template>
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"> -->
 <div id="calendar" style="height:100%"></div>
 
</template>



<style >
:root{
  --theme-color:var(--el-color-primary-light-3);
  --toolbar-checked-color:var(--el-color-primary-dark-2);
  --toolbar-standard-color:var(--el-color-primary);
}


/* 项目内容按钮（组） */

/* 标准样式 */
.fc-toolbar-chunk .fc-button-primary,
.fc-toolbar-chunk .fc-button-group .fc-button-primary{
    border-color: var(--toolbar-standard-color);
    background-color: var(--toolbar-standard-color);
}

/* 禁用样式 */
.fc-toolbar-chunk .fc-button-primary:disabled,
.fc-toolbar-chunk .fc-button-group .fc-button-primary:disabled{
    border-color: var(--theme-color);
    background-color: var(--theme-color);
    /* color: #ffffff; */
}

/* 选中样式 */
.fc-toolbar-chunk .fc-button-primary:not(:disabled).fc-button-active, .fc-toolbar-chunk .fc-button-primary:not(:disabled):active,
.fc-toolbar-chunk .fc-button-group .fc-button-primary:not(:disabled).fc-button-active, .fc-toolbar-chunk .fc-button-group .fc-button-primary:not(:disabled):active{
    border-color: var(--toolbar-checked-color);
    background-color: var(--toolbar-checked-color);
}

/* 鼠标悬停样式 */
.fc-toolbar-chunk .fc-button-primary:hover,
.fc-toolbar-chunk .fc-button-group .fc-button-primary:hover{
    border-color: var(--theme-color);
    background-color: var(--theme-color);
}

/* 焦点样式 */
.fc-toolbar-chunk .fc-button-primary:focus,
.fc-toolbar-chunk .fc-button-group .fc-button-primary:focus{
    box-shadow:none !important;
}

/* 视图默认事件颜色 */

/* 月视图 */
.fc-h-event,.fc-timegrid-event-harness .fc-h-event,
/* 周视图 */
.fc-v-event,.fc-timegrid-event-harness .fc-v-event{
    border-color: var(--toolbar-standard-color);
    background-color: var(--toolbar-standard-color);
}

.search-list-item-left:hover{
    color: var(--theme-color);
}

/* 主题文字浮动色 */
.theme-font-color-hover:hover{
   color: var(--theme-color); 
   transition: color 0.15s;
}

.fc .fc-button{
  font-size: 13px;
}
.fc .fc-toolbar-title{
  font-size: 20px;
}

/* 隐藏列表小蓝点 */
.fc-direction-ltr .fc-list-table .fc-list-event-graphic{
  display: none;
}

/* 禁用列表hover事件 */
.fc .fc-list-event:hover td{
  background: none !important;
  cursor: pointer;
}

.fc-sticky{
  position: inherit;
}

/* 深色模式适配 */
.dark .fc-theme-standard .fc-list-day-cushion,
.dark .fc .fc-list-sticky .fc-list-day>* {
  background: var(--el-bg-color-overlay);
}
</style>
