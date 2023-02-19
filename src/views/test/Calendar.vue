<script setup>
import { reactive, ref, unref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import Calendar from '../../components/Calendar.vue'
import Etip from '../../components/Etip.vue'

import moment from 'moment'
import cmn from "../../utils/cmn";


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

 const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'block',
    start: todayStr,
    display:"block",
  },
  {
    id: createEventId(),
    title: 'list-item',
    start: todayStr,
    display:"list-item",
  },
  
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
  
]

function createEventId() {
  return String(eventGuid++)
}

// 事件内容
const eventContent=(arg)=>{
  console.log(arg)
  //  let italicEl = document.createElement('i')

  // if (arg.event.extendedProps.isUrgent) {
  //   italicEl.innerHTML = 'urgent event'
  // } else {
  //   italicEl.innerHTML = 'normal event'
  // }
  // return[ 'aaaaaaaaaaaaaaa', 'otherclassname' ]
  // let arrayOfDomNodes = [ italicEl ]
  // return { domNodes: arrayOfDomNodes }
 return  { html: `
			<div class="fc-event-main-frame">
        
				<div class="fc-event-time">${arg.timeText}</div>
				<div class="fc-event-title-container">
          
					<div class="fc-event-title fc-sticky"><div class="event-dot-box"><span class="event-dot"></span></div> 📄 ${arg.event.title}</div>
				</div>
			</div>` }
}

const visible=ref(false)
const eventMouseEnter=(arg)=>{
  console.log("内容",arg)
  const event=arg.event
  popoverContent.time=cmn.startAndEndTimeFormatShort(event.startStr,event.endStr);
  popoverContent.title=event.title
  visible.value = true
}
const eventMouseLeave=()=>{
  visible.value = false
}

const popoverContent = reactive({
  title:"",
  content:"",
  time:""
})





</script>

<template>
<div style="padding:50px 100px">
  <Calendar ref="calendarObj" 
    initialView="dayGridMonth" 
    :initialEvents="INITIAL_EVENTS"

    :editable="true"
    :selectable="true"
    :nowIndicator="true"
    :eventContent="eventContent"
    :displayEventTime="true"
    :displayEventEnd="true"
    :eventMouseEnter="eventMouseEnter"
    :eventMouseLeave="eventMouseLeave"
    />
</div>

<Etip v-model:visible="visible" width="300px">
  <div>时间：{{popoverContent.time}}</div>
  <div>标题：{{popoverContent.title}}</div>
</Etip>

 
</template>

<style>

/* .event-dot {
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: #000000;
  display: inline-block;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
} */

.event-dot {
    margin-bottom: 1px;
    display: inline-block;
    width: 0;
    height: 0;
    border: 4px solid #ff7349;
    /* border: calc(var(--fc-list-event-dot-width, 6px) / 2) solid var(--fc-event-border-color, #ff7349); */
    border-radius: 4px;
    /* border-radius: calc(var(--fc-list-event-dot-width, 6px) / 2); */
}

.event-dot-box{
  display: inline-block;
}
</style>