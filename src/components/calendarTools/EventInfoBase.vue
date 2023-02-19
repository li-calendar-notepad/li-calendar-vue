<script setup>
import { reactive,ref } from "@vue/reactivity";
import StipulateTemplate from "./common/stipulateTemplate.vue";
import apiEvent from "../../api/event";
import cmn from "../../utils/cmn"

import { Clock,CloseBold,FullScreen,Edit,CircleCloseFilled ,BottomRight,Delete,Loading} from '@element-plus/icons-vue'

import { onMounted, watch } from "@vue/runtime-core";

import vditor from "vditor";
import 'vditor/dist/index.css';


import SelectStyle from "../../components/calendarTools/styleTool/SelectStyle.vue";

const props =defineProps({
  eventTitle:{},// 事件标题
  eventContent:{},// 事件内容
  eventTime:{},// 事件时间范围串
  eventCreateTime:{},// 事件创建时间
  isLoading:{
    default:false,// 是否为加载中
  },
  dialog:Boolean,// 弹窗模式
  dialogBeforeClose:{},// 弹窗关闭前
  dialogOpened:{},// 弹窗关闭后
  toolBarButtons:{
    default:["fullScreen","minWindow","edit","delete"] // 工具栏按钮
  },
  dialogCloseOnPressEscape:{},//esc 关闭弹窗
  dialogShow:{},

})


onMounted(()=>{


})


const dialogFullScreen=ref(false)
const eventInfo=ref({})
const emits=defineEmits([
  "update:isLoading",
  "update:dialogShow",
  "done",
  // "update:dialogFullScreen",

])


const previewMarkdown=(md)=>{
  emits("update:isLoading", true)
  const options = {
    hljs: { style: "monokai" },
    after: () => {
      emits("update:isLoading", false)
      emits("done")
    },
    cdn: "static/vditor-cdn",
  }
  // 深色模式（暗黑模式）
  if(cmn.isDark()){
    options.theme = {
      current: "dark" // 编辑器内容风格
    }
  }
  vditor.preview(document.getElementById("vditorPreview"), md, options);
}

// const renderByEventId=(itemId,eventId)=>{
//   isLoading.value=true
//   if(props.dialog==true){
//     console.log("打开弹窗")
//     dialogShow.value=true
//     emits("update:dialogShow",true)
//   }
//   // // apiEvent.setVisitToken(props.visitToken)
//   apiEvent.getInfo(itemId,eventId,(data)=>{
//     eventInfo.value=data
//     previewMarkdown(data.content)
//     isLoading.value=false
//   })
// }

// const dialogClose=()=>{
//   emits("update:dialogShow",false)
// }

const setFullScreen=(show)=>{
  dialogFullScreen.value=show
}

const onClose=()=>{
  emits("update:dialogShow", false)
}

// const toolBarButtonsHas=(value)=>{
//   if(props.toolBarButtons.indexOf(value)!=-1){
//     return true
//   }else{
//     return false
//   }
// }


// 监听变化
watch(()=>props.eventContent,(newContent,oldContent)=>{
  previewMarkdown(newContent)
})



// 暴露出去的内容
defineExpose({
  // renderByEventId
})


</script>

<template>
  <div class="components-event-info-base">
    <StipulateTemplate style="color:#303133" 
      :dialog="dialog" 
      v-model:dialogShow="dialogShow" 
      :dialogFullScreen="dialogFullScreen"
      :dialogBeforeClose="dialogBeforeClose"
      dialogBigScreenWidth="700px"
      :dialogShowClose="false"
      :dialogCloseOnPressEscape="false"
      :dialogDraggable="false"
      dialogMinHeight="400px"
      @dialogClose="onClose"
      
    >
      <div class="title e-primary-text">{{eventTitle}}</div>
      <!-- <div>作者：红烧猎人</div> -->
      <div class="time e-placeholder-text"><el-icon><Clock /></el-icon> <span>{{eventTime}}</span></div>
      <div v-show="eventContent">
        <el-divider />
        <div id="vditorPreview" class="content"></div>
      </div>
      <el-divider>
        <!-- <span class="e-disabled-text">end</span> -->
        <div style="font-size:12px" class="e-disabled-text">创建于：{{eventCreateTime}}</div>
      </el-divider>
      <template #header>
        <div class="toolBar e-regular-text" style="display:flex;">
          <span style="display:flex;">
            <el-icon v-if="!dialogFullScreen" @click="setFullScreen(true)"><FullScreen /></el-icon>
            <el-icon v-if="dialogFullScreen" @click="setFullScreen(false)"><BottomRight /></el-icon>
            <slot name="header">

            </slot>
            <el-icon v-if="isLoading" class="is-loading"><Loading /></el-icon>
          </span>
          <span style="display:flex;margin-left:auto;">
            <el-icon @click="dialogShow=false" style="margin-right:0"><CloseBold /></el-icon>
          </span>
        </div>
      </template>
      

    </StipulateTemplate>
    
  </div>
</template>


<style scoped>
.title{
  
  font-size: 20px;
}
.time{
  margin-top:10px;
}
.toolBar{
  font-size: 25px;
  
}

.el-dialog__body{
  margin-top:200px ;
}
</style>

<style>
.components-event-info-base .toolBar .el-icon {
  margin: 0 10px;
  cursor: pointer;
}

.components-event-info-base .toolBar .el-icon:hover {
  color: var(--el-color-primary)

}
</style>