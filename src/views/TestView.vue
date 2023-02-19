<script setup>
import { onMounted ,reactive,ref} from 'vue'

import Calendar from '../components/Calendar.vue'
import Edialog from '../components/Edialog.vue'

let dialogShow=ref(false)
let data=reactive({"display":false})
const handleDateSelect=(selectInfo)=>{
    data.display=true
    dialogShow.value=true
    console.log("日历被点击")
    return

  let title = prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar
  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      // id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}

</script>

<template>
<div>
<Calendar @handle-date-select="handleDateSelect"/>

<!-- <Edialog title="删除文件" :visible="data.display" >
    <span>请确定是否删除选中文件并加入到回收站</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="data.display = false">取消</el-button>
        <el-button size="mini" type="primary" >确定</el-button>
      </span>
    </template>
    
</Edialog> -->

<Edialog title="删除文件" :visible="dialogShow" >
    <span>请确定是否删除选中文件并加入到回收站</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="dialogShow = false">取消</el-button>
        <el-button size="mini" type="primary" >确定</el-button>
      </span>
    </template>
    
</Edialog>

</div>
 
</template>


