<script setup>
import { reactive,ref } from "@vue/reactivity";
import StipulateTemplate from "./common/stipulateTemplate.vue";
import moment from 'moment'

import apiItem from "../../api/item";
import apiEvent from "../../api/event";
import apiFile from "../../api/file";
import apistyle from "../../api/style";
import apiSubject from "../../api/subject";
import apiRequest from "../../api/request";

import { ElMessage } from "element-plus";
import { onMounted } from "@vue/runtime-core";
import Vditor from "../../components/Vditor.vue";
import cmn from "../../utils/cmn"
import { FullScreen, BottomLeft, CloseBold } from '@element-plus/icons-vue'

import SelectStyle from "../../components/calendarTools/styleTool/SelectStyle.vue";

import { useI18n } from "vue-i18n";
const $i18n = useI18n()
const props =defineProps({
  itemId:Number,
  eventId:{},
  // title: {
  //   type: String,
  //   default:"添加事件"
  // },
  done:{},
  visitToken:{},
  dialog:Boolean,
  dialogShow:Boolean,
  dialogBeforeClose:{},
  dialogOpened:{},
  // dialogFullScreen:{},
  defaultData:{
    default:{
      eventId:null,
      itemId:null,
      title:"",
      content:"",
      startTime:"",
      endTime:"",
      style:"",
      remind:"",
    }
  }
})

// const dialogShow=ref(false)
const title=ref("")
const dialogFullScreen=ref(false)


onMounted(()=>{
  apiSubject.setVisitToken(props.visitToken)
  apiEvent.setVisitToken(props.visitToken)
  if(props.done){
    props.done({
      
    })
  }

  apistyle.getStyleList((d)=>{

    globalData.styleList=d.list
    // console.log("样式",globalData,d)
  })

  // 深色模式适配（暗黑模式）
  if (cmn.isDark()) {
    vditorOptions.theme = "dark"
    vditorOptions.preview = {
      theme: {
        current: "dark"
      },
      hljs: {
        style: "monokai"
      }
    }
  }

})



const vditorObj=ref()
const formSpan=ref(0)
const subjectList=ref()
const emits=defineEmits([
  "update:dialogShow",
  "addAfter",// (eventInfo)
  "updateAfter",// (eventInfo)
])

const dialogClose=()=>{
  emits("update:dialogShow",false)
}

const toolbarWide=[
  "emoji",
  "headings",
  "bold",
  "italic",
  "strike",
  "link",
  // "|",
  // "list",
  // "ordered-list",
  // "check",
  // "outdent",
  // "indent",
  "|",
  "quote",
  "line",
  "table",
  "|",
  "insert-before",
  "insert-after",
  "|",
  "undo",
  "redo",
  "|",
  "upload",
  "record",
  "|",
  // 列表可用
  {
    name: "",
    icon: '<svg><use xlink:href="#vditor-icon-list"></use></svg>',
    // tip:"列表",
    hotkey: "",
    toolbar: [
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent"
    ],
  },
  {
    name: "more",
    toolbar: [
      "code",
      "inline-code",
      "edit-mode",
      // "code-theme",
      // "content-theme",
      // "export",
      "outline",
      // "preview",
      // "devtools",
      // "info",
      "help",

    ],
  },
  "fullscreen"
]


const toolbarSmall = [
  "emoji",
  "headings",
  // "|",
  // "quote",
  // "line",
  // "table",
  // "|",
  // "insert-before",
  // "insert-after",
  // 可插入
  {
    name: "more",
    // tip:"列表",
    hotkey: "",
    toolbar: [
      "insert-before",
      "insert-after",
      "bold",
      "italic",
      "strike",
      "link",
      "quote",
      "line",
      "table",
    ],
  },
  "|",
  "undo",
  "redo",
  "|",
  "upload",
  "record",
  "|",
  // 列表可用
  {
    name: "",
    icon:'<svg><use xlink:href="#vditor-icon-list"></use></svg>',
    // tip:"列表",
    hotkey: "",
    toolbar: [
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent"
    ],
  },



  {
    name: "more",
    toolbar: [
      "code",
      "inline-code",
      "edit-mode",
      "outline",
      "help",

    ],
  },
  "fullscreen"
]



const vditorOptions=reactive({
  height:"300px",
  width:"100%",
  typewriterMode:true,
  icon:"material",
  cdn:"static/vditor-cdn",
  placeholder: $i18n.t("calendar.eventEdit.content_placeholder"),
  resize:{
    enable:true
  },
  tab:"\t",
  // input:(v)=>{
  //   console.log("input",v)
  // },
  // blur:(v)=>{
  //   console.log("blur",v)
  // },
  cache:{
    enable:false,
  },
  toolbar: toolbarSmall,
  upload:{
    url:apiFile.getUploadFilesUrl(),
    headers:{"token":apiRequest.getToken()},
    fieldName:"files[]",
    // multiple:false,
    // format(files, responseText){
    //   // 单图片上传
    //   const res = JSON.parse(responseText)
    //   const successData={
    //       "msg": "",
    //       "code": 0,
    //       "data": {
    //         "errFiles": [
    //           // 'filename', 
    //           // 'filename2'
    //           ],
    //         "succMap": {
    //           // "filename3": "filepath3",
    //           // "filename3": "filepath3"
    //           }
    //     }
    //   }
    //   if(res.code!=0){
    //     ElMessage.error("warning","上传失败请重试")
    //     return "";
    //   }
    //   successData.code=res.code
    //   successData.msg=res.msg
    //   successData.data.succMap[files[0].name]=res.data.imageUrl
    //   console.log("数据数据",JSON.stringify(successData))
    //   return JSON.stringify(successData)
    // },
  }
})




const eventInfo=reactive(props.defaultData)


let styleList=reactive([
  // {
  //   title:"绿色",
  //   className:"#000",
  //   id:1,
  // },
  // {
  //   title:"粉色",
  //   className:"#000",
  //   id:2,
  // },
  // {
  //   title:"黑色",
  //   className:"#000",
  //   id:3,
  // },
  // {
  //   title:"白色",
  //   className:"#000",
  //   id:4,
  // },
  // {
  //   title:"绿色",
  //   className:"#000",
  //   id:5,
  // },
])

const dialogOpen=()=>{
  const d=document.getElementById("dialogObj")
  const width =d.offsetWidth
  if (width<399){
    formSpan.value=24
  }else if(width<800){
    formSpan.value=12
  }else if(width<1000){
    formSpan.value=8
  }else{
    formSpan.value=8
  }
  apiSubject.setVisitToken(props.visitToken).getList(props.itemId,(d)=>{
    subjectList.value=d.list
  })
}

const clickClose=()=>{
  emits("update:dialogShow",false)
}

// 保存事件
const saveEvent = (closeDialog)=>{
  eventInfo.content=vditorObj.value.getValue()

  if(eventInfo.content=="\n"){
    eventInfo.content=""
  }
  // console.log("准备保存",eventInfo)
  // return

  // 开始时间和结束时间不可以为空
  if(!eventInfo.startTime || !eventInfo.endTime){
    ElMessage.warning($i18n.t("calendar.eventEdit.timeNotEmpty"))
    return
  }

  // 事件id存在
  if(eventInfo.eventId){
    // 修改
    eventInfo.eventId=Number(eventInfo.eventId)
    apiEvent.updateByEventId(props.itemId,eventInfo,()=>{
      if(closeDialog!==false){
        emits("updateAfter", eventInfo)
        emits("update:dialogShow",false)
      }else{
        ElMessage.success($i18n.t("calendar.eventEdit.successed"))
      }
      return false
    })
  }else{
    // 添加
    apiEvent.createOne(props.itemId,eventInfo,(data)=>{
      if(closeDialog!==false){
        emits("addAfter", eventInfo)
        emits("update:dialogShow",false)
      }else{
        ElMessage.success($i18n.t("calendar.eventEdit.created"))
      }
      eventInfo.eventId = data.eventId
      return false
    })
  }
  
}

// 编辑器加载完成
const vditorAfter=(value)=>{
  vditorObj.value=value
  // console.log(value)
}


// 启动添加事件弹窗
const addEvent = (itemId,data)=>{
  resizeEditToolbar()
  const currentTime = moment()
  title.value = $i18n.t("calendar.eventEdit.addEvent")
  var data = data||{}
  eventInfo.itemId=itemId
  eventInfo.eventId=null
  eventInfo.title=data.title || ""
  eventInfo.content=data.content || ""
  eventInfo.startTime = data.startTime || currentTime.format('YYYY-MM-DD HH:mm:ss')
  eventInfo.endTime = data.endTime || currentTime.add(1,"hours").format('YYYY-MM-DD HH:mm:ss')
  eventInfo.reminderBefore=data.reminderBefore || 0
  eventInfo.className=data.className || ""
  if(vditorObj.value){
    vditorObj.value.setValue("",true)
  }
  emits("update:dialogShow",true)
  // dialogShow.value=true
  // apiEvent.createOne(itemId,d)
}

// 启动编辑事件弹窗
const editEvent=(itemId,eventId)=>{
  resizeEditToolbar()
  title.value = $i18n.t("calendar.eventEdit.updateEvent")
  emits("update:dialogShow",true)
  apiEvent.getInfo(itemId,eventId,(data)=>{
    eventInfo.itemId=itemId
    eventInfo.eventId=data.eventId 
    eventInfo.title=data.title || ""
    eventInfo.content=data.content || ""
    eventInfo.startTime=data.startTime || ""
    eventInfo.endTime=data.endTime || ""
    eventInfo.reminderBefore=data.reminderBefore || 0
    eventInfo.className=data.className || ""
    vditorObj.value.setValue(eventInfo.content,true)
  })
}

// 点击快捷主题
const onClickSubjectItem=(subjectInfo)=>{
  const subjectTitle=`#${subjectInfo.title}#`
  // 检测是否存在该主题
  if(eventInfo.title.indexOf(subjectTitle)===-1){
    eventInfo.title=subjectTitle+" "+eventInfo.title
    eventInfo.className=subjectInfo.className
  }
}



const globalData=reactive({
  styleList:[]
})

const setFullScreen = (show) => {
  dialogFullScreen.value = show
}

// 监听快捷键
const onKeyUp=(e)=>{
  if ((e.ctrlKey == true || e.metaKey == true) && e.keyCode == 83){
    saveEvent(false)
    e.preventDefault();
  }
}

const resizeEditToolbar=()=>{
  if (cmn.getScreenSizeName() == "xs") {
    vditorOptions.toolbar = toolbarSmall
  } else {
    vditorOptions.toolbar = toolbarWide
  }
}

// 暴露出去的内容
defineExpose({
  addEvent,
  editEvent,
})

onMounted(()=>{
  apiSubject.setVisitToken(props.visitToken)
  resizeEditToolbar()
})


</script>

<template>
  <div class="components-event-edit">
    <StipulateTemplate style="color:#303133" 
    :dialog="dialog" 
    v-model:dialogShow="dialogShow" 
    :dialogCloseOnClickModal="false"
    :dialogBeforeClose="dialogBeforeClose"
    :dialog-close-on-press-escape="false"
    :dialog-draggable="false"
    :dialog-show-close="false"
    dialogBigScreenWidth="800px"
    :dialog-full-screen="dialogFullScreen"
    @dialogOpen="dialogOpen"
    @dialogOpened="dialogOpened"
    @dialogClose="dialogClose"
    @keydown="onKeyUp"
    >
      <template #header>
        <div class="toolBar e-regular-text" style="display:flex;">
          <span style="display:flex;">
            {{ title }}
            <!-- <el-icon v-if="isLoading" class="is-loading"><Loading /></el-icon> -->
          </span>
          <span style="display:flex;margin-left:auto;">
            <el-icon v-if="!dialogFullScreen" @click="setFullScreen(true)"><FullScreen /></el-icon>
            <el-icon v-if="dialogFullScreen" @click="setFullScreen(false)"><BottomLeft /></el-icon>
            <el-icon @click="dialogShow=false" style="margin-right:0"><CloseBold /></el-icon>
          </span>
        </div>
      </template>
      <div>
        <el-scrollbar>
          <el-form :model="eventInfo" id="dialogObj" ref="dialogObj" style="margin: 0 10px;" >
            <el-form-item>
              <el-input style="font-size: 20px;" :maxlength="255" v-model="eventInfo.title" type="textarea"
                :placeholder="$t('calendar.eventEdit.title_placeholder')" />
            </el-form-item>
            <el-form-item>
              <el-scrollbar>
                <div class="subject-scrollbar-flex-content">
                  <div class='fc-event fc-h-event fc-daygrid-event subject-scrollbar-item e-no-select-text'
                    :styleClass="item.className" :class="item.className" v-for=" item,index in subjectList" :key="index">
                    <div class='fc-event-main' @click="onClickSubjectItem(item)">#{{item.title}}# </div>
                  </div>
                </div>
              </el-scrollbar>
            </el-form-item>
        
            <!-- <el-form-item :label="$t('calendar.eventEdit.content')">
                    <el-input v-model="form.description" type="textarea" :placeholder="$t('calendar.eventEdit.content_placeholder')" />
                  </el-form-item> -->
            <el-form-item>
              <Vditor :options="vditorOptions" :content="eventInfo.content" @after="vditorAfter" />
            </el-form-item>
        
            <el-row :gutter="10">
        
              <el-col :span="formSpan">
                <el-form-item :label="$t('calendar.eventEdit.startTime')">
                  <el-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model="eventInfo.startTime" size="small" type="datetime"
                    :placeholder="$t('calendar.eventEdit.startTime_placeholder')" />
                </el-form-item>
              </el-col>
        
              <el-col :span="formSpan">
                <el-form-item :label="$t('calendar.eventEdit.endTime')">
                  <el-date-picker value-format="YYYY-MM-DD HH:mm:ss" v-model="eventInfo.endTime" size="small" type="datetime"
                    :placeholder="$t('calendar.eventEdit.endTime_placeholder')" />
                </el-form-item>
              </el-col>
        
              <el-col :span="formSpan">
                <el-form-item :label="$t('calendar.eventEdit.style')">
                  <!-- <el-select v-model="eventInfo.className" :placeholder="$t('calendar.eventEdit.style_placeholder')">
                          <el-option :label="item.title" :value="item.className" v-for="(item,index) in globalData.styleList" :key="index"/>
                        </el-select> -->
                  <SelectStyle :data="globalData.styleList" v-model="eventInfo.className" size="small" />
                </el-form-item>
              </el-col>
        
              <el-col :span="formSpan" >
                <el-form-item :label="$t('calendar.eventEdit.remind')" size="small">
                  <el-select v-model="eventInfo.reminderBefore" :placeholder="$t('calendar.eventEdit.remind_placeholder')">
                    <el-option label="关闭" :value="0" />
                    <el-option label="开始前1分钟" :value="1" />
                    <el-option label="开始前5分钟" :value="5" />
                    <el-option label="开始前10分钟" :value="10" />
                    <el-option label="开始前15分钟" :value="15" />
                    <el-option label="开始前30分钟" :value="30" />
                    <el-option label="开始前1小时" :value="60" />
                    <el-option label="开始前2小时" :value="120" />
                    <el-option label="开始前1天" :value="1440" />
                    <el-option label="开始前2天" :value="2880" />
                    <el-option label="开始前1周" :value="10080" />
                  </el-select>
                </el-form-item>
              </el-col>
        
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      
      <template v-slot:footer>
          <span>
            <el-button @click="clickClose">取消</el-button>
            <el-button type="primary" @click="saveEvent">确定</el-button>
          </span>
      </template>
    </StipulateTemplate>
    
  </div>
</template>


<style scoped>
.subject-scrollbar-flex-content {
  display: flex;
  margin-block: 5px;
  line-height: 25px;
}
.subject-scrollbar-item {
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  padding: 0 5px;
  margin: 0 8px;
  margin-block: 5px;
  border-radius: 4px;
}
.components-event-edit .toolBar .el-icon {
  margin: 0 10px;
  cursor: pointer;
  font-size: 25px;
}

.components-event-edit .toolBar .el-icon:hover {
  color: var(--el-color-primary)
}
</style>

<style>
.components-event-edit .el-form-item{
  margin-bottom: 5px;
}
</style>