<script setup>
import { reactive, ref } from '@vue/reactivity'
import Edialog from "../../components/Edialog.vue";
import moment from 'moment'

import apiAdminStyle from "../../api/admin/style";

import { Edit,Delete} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '../../api/request';
import cmn from "@/utils/cmn";

const shwoBorder = ref(false)
const tableData=ref()
const editVisible=ref(false)
const eventStylePrefix="event-style-"


const styleTableRef=ref()
const uploadRef = ref()


const border =reactive({
  borderStyle: "solid",
  borderWidth: "3px",
  borderColor: "#000",
})
const style=reactive({
  "color":"#fff",
  "background":"#a6a6a6",
  "border":"#a6a6a6 solid 3px"
})
const styleContent=reactive({
  title:"",
  className:"",
  styleId:null
})

const borderChange=()=>{
  if(shwoBorder.value==false){
    border.borderColor=style.background
    // style.border=border.borderColor+" "+border.borderStyle+" "+border.borderWidth
  }
  // else{
  //   style.border=style.background+" "+border.borderStyle+" "+border.borderWidth
  // }
  style.border=border.borderColor+" "+border.borderStyle+" "+border.borderWidth
}
const buildStyle=()=>{
  borderChange()
  apiAdminStyle.edit(styleContent.styleId,  {
      "title":styleContent.title,
      "sort":99,            
      "className":eventStylePrefix+styleContent.className,       
      "textColor":style.color,       
      "backgroundColor" :style.background,
      "borderColor" :border.borderColor 
  },()=>{
    editVisible.value=false
    getList()
  })
}
const updateEventStyle=(eventStyle)=>{
  style.color=eventStyle.textColor
  style.background=eventStyle.backgroundColor
  border.borderColor=eventStyle.borderColor?eventStyle.borderColor:eventStyle.backgroundColor
  if(eventStyle.backgroundColor!=border.borderColor){
    shwoBorder.value=true
  }else{
    shwoBorder.value=false
  }
  styleContent.title=eventStyle.title
  styleContent.className=getClassName(eventStyle.className)
  styleContent.styleId=eventStyle.styleId
  borderChange()
  editVisible.value=true
}
const createEventStyle=()=>{
  style.color="#fff"
  style.background="#15C8FF"
  border.borderColor=style.background
  shwoBorder.value=false
  styleContent.title=""
  styleContent.className="estyle-c"+moment().format("MMDDhhmmss")
  styleContent.styleId=null
  borderChange()
  editVisible.value=true
}
const getClassName=(className)=>{
  // console.log("className",className.slice(0,eventStylePrefix.length),eventStylePrefix)
  if(className.slice(0,eventStylePrefix.length)==eventStylePrefix){
    return className.slice(eventStylePrefix.length)
  }else{
    return className
  }
}
const getList=()=>{
  apiAdminStyle.getStyleList((d)=>{
    tableData.value=d.list
  })
}
const deleteOne=(eventStyle)=>{
  ElMessageBox.confirm(
    '确定删除该风格样式 '+eventStyle.title,
    '警告',
    {
      type: 'warning',
    }
  ).then(() => {
    apiAdminStyle.deletes([eventStyle.styleId],()=>{
      ElMessage.success("已删除")
      getList()
    })
    
  })
}
// 获取选中项进行导出
const exportjsonFile=()=>{

  const rows=styleTableRef.value.getSelectionRows()
  if(rows.length==0){
    ElMessage.warning("请在列表中选中要导出的项")
    return
  }
  const styleIds=[]
  for (let i = 0; i < rows.length; i++) {
    const element = rows[i];
    styleIds.push(element.styleId)
  }
  apiAdminStyle.eventStyleExport("EventStyle"+moment().format("YYYYMMDDHHmmss"),styleIds)
}
// 上传导入文件
const submitUpload = () => {
  uploadRef.value.submit()
}
// 配置文件上传成功
const jsonConfigUploadSuccess=(response,uploadfile)=>{
  if(response.code==0){
    ElMessage.success("导入成功")
    getList()
  }else{
    ElMessage.warning("导入失败,"+response.msg)
  }
}
getList()
</script>

<template>
<div style="padding:20px;height:calc(100% - 50px)">
  <!-- <h2>风格管理</h2> -->
  <el-button @click="createEventStyle">新建</el-button>
  <el-button @click="exportjsonFile">导出</el-button>
  <el-upload
    ref="uploadRef"
    action="/api/v1/admin/style/eventStyleImport"
    :headers="{token:request.getToken()}"
    :auto-upload="true"
    :on-success="jsonConfigUploadSuccess"
    :accept="cmn.uploadAcceptType"
    :show-file-list="false"
    style="display: inline-flex;margin-left:12px"
  >
    <template #trigger>
      <el-button>导入</el-button>
    </template>

    <!-- <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button> -->

    <!-- <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template> -->
  </el-upload>

  <Edialog v-model:visible="editVisible" title="编辑" :closeOnClickModal="true" bigScreenwidth="600px">
    <div id="external-events">
      <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event' :style="style">
        <div class='fc-event-main'>事件的标题</div>
      </div>
    </div>

    
    <el-row>
      <el-col :span="8">
          <span class="demonstration"> 背景颜色 </span>
          <el-color-picker size="large" v-model="style.background"  @change="borderChange" />
          
      </el-col>

      <!-- 暂时关闭定义 -->
      <el-col :span="8" v-show="false">
          <span class="demonstration"> 文字颜色 </span>
          <el-color-picker size="large" v-model="style.color" />
          
      </el-col>
      
      <el-col :span="8">
          <div v-if="shwoBorder">
            <span class="demonstration"> 边框颜色 </span>
            <el-color-picker size="large" v-model="border.borderColor" @change="borderChange" />
          </div>
      </el-col>

      <el-col :span="24" style="margin-top:20px">
          <div>
            <el-checkbox v-model="shwoBorder" @change="borderChange" label="单独设置边框颜色" size="large" />
          </div>
      </el-col>
      <el-col :span="12" style="margin-top:20px">
          <div class="e-secondary-text">风格名称</div>
          <div class="demo-color-block" style="width:200px">
            <el-input v-model="styleContent.title" placeholder="起个名字（唯一）" />
          </div>
      </el-col>
      <el-col :span="12" style="margin-top:20px">
          <div class="e-secondary-text">英文标识</div>
          <div class="demo-color-block" style="width:200px">
            <el-input v-model="styleContent.className" placeholder="字母标识（唯一）" />
          </div>
      </el-col>
    </el-row>


    <template v-slot:footer>
      <div class="demo-color-block">
        <el-button @click="buildStyle" type="primary">保存</el-button>
      </div>
    </template>
   
  </Edialog>



  <el-table ref="styleTableRef" :data="tableData" height="calc(100% - 40px)" style="width: 100%">

    <el-table-column type="selection" width="55" />
    
    <el-table-column prop="title" label="样式" width="250" >
      <template #default="scope">
        <div class="table-external-events" >
          <div class='fc-event' :style="{backgroundColor:scope.row.backgroundColor,borderColor:(scope.row.borderColor?scope.row.borderColor:scope.row.backgroundColor),borderWidth:'1px',borderStyle:'solid'}">
            <div class='fc-event-main' :style="{color:scope.row.textColor}" >{{scope.row.title}} </div>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="title" label="名称"  width="180"/>

    <el-table-column prop="className" label="英文标识" width="180" >
      <template #default="scope">
        {{getClassName(scope.row.className)}}
      </template>
    
    </el-table-column>
    <el-table-column label="编辑">
      <template #default="scope">
       <el-button type="primary" @click="updateEventStyle(scope.row)" :icon="Edit" />
       <el-button type="danger" @click="deleteOne(scope.row)" :icon="Delete"  />
      </template>
    </el-table-column>

  </el-table>


  
</div>
 
</template>

<style scoped>
#external-events {
  display: flex;
  width: 200px;
  padding: 0 20px;
  display: flex;
  flex-direction:column;
  height: 120px;
  /* background: pink; */
}

#external-events .fc-event {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  font-size: 25px;
  margin: 5px 0;
  padding-left: 5px;
  background: gray;
  border-radius: 10px;
}


.table-external-events {
  display: flex;
  width: 180px;
  padding: 0 5px;
  display: flex;
  flex-direction:column;
  /* height: 120px; */
  /* background: pink; */
}

.table-external-events .fc-event {
  width: 100%;
  height: 25px;
  line-height: 25px;
  display: flex;
  font-size: 15px;
  margin: 5px 0;
  padding-left: 5px;
  background: gray;
  border-radius: 5px;
}

.demo-color-block{
  margin-top: 10px;
}

</style>