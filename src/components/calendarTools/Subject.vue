<script setup>
import { reactive, ref } from "@vue/reactivity";
import { Edit,Delete,Plus} from '@element-plus/icons-vue'
import StipulateTemplate from "./common/stipulateTemplate.vue";
import apiItem from "../../api/item";
import apiStyle from "../../api/style";
import apiSubject from "../../api/subject";

import Edialog from "../../components/Edialog.vue";
import SelectStyle from "../../components/calendarTools/styleTool/SelectStyle.vue";

import { ElMessage, ElMessageBox } from "element-plus";


import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { onMounted } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";
const $i18n=useI18n()
const $t=$i18n.t

const editSubjectFormRef=ref()
const manageDialogShow=ref(false)
const editDialogShow=ref(false)

const editSubjectInfo=ref({})// 事件详情
const editSubjectInfoEdialog=reactive({
  title:"编辑事件主题"
})// 事件弹窗信息

const props =defineProps({
  itemId:Number,
  title: {
    type: String,
    // default:"事件主题"
  },
    // 是否为对话框方式展示
  dialog:{
    type: Boolean,
    default:false
  },
  // 显示对话框
  dialogShow:{
    type: Boolean,
    default:false
  },
  visitToken:{}
})

apiSubject.setVisitToken(props.visitToken)

let styleList=ref([])


const subjectList=ref([
  // {
  //   title:"带饭",
  //   className:"green",
  // },
])
const saveSubject=()=>{

  // console.log("选择",editSubjectInfo.value)
  if(editSubjectInfo.value.subjectId){
    // 修改
    // console.log("更新修改")
    apiSubject.update(props.itemId,editSubjectInfo.value.subjectId,editSubjectInfo.value,()=>{
      editDialogShow.value=false;
      resetEditSubjectForm()
      getList()
    })
  }else{
    // 添加
    // console.log("添加")
    apiSubject.create(props.itemId,editSubjectInfo.value,()=>{
      editDialogShow.value=false;
      resetEditSubjectForm()
      getList()
      
    })
  }
}

const resetEditSubjectForm=()=>{
  // console.log(editSubjectFormRef.value)
  if(editSubjectFormRef.value){
    editSubjectFormRef.value.resetFields()
  }
}

const getList=()=>{
  apiSubject.getList(props.itemId,(d)=>{
    subjectList.value=d.list
    // console.log("主题列表",subjectList)
  })
}

const updateSubjectOpen=(info)=>{
  // console.log("编辑",info)
  editSubjectInfo.value=JSON.parse(JSON.stringify(info))
  editDialogShow.value=true
  resetEditSubjectForm()
}

const deleteSubjectOne=(info)=>{
  // console.log("删除",info)
  ElMessageBox.confirm(
    $t('calendar.subject.deleteSubject_msg_box',{subjectTitle:info.title}),
    $t('common.warning'),
    {
      type: 'warning',
    }
  ).then(() => {
    apiSubject.deletes(info.itemId,[info.subjectId],()=>{
      ElMessage.success($t('common.delete_success'))
      getList()
    })
    
  })
  // editSubjectInfo.value=JSON.parse(JSON.stringify(info))
  // editDialogShow.value=true
  // resetEditSubjectForm()
}


const addSubject=()=>{
  editSubjectInfoEdialog.title="添加事件主题"
  editDialogShow.value=true
  resetEditSubjectForm()
}



onMounted(()=>{
  var containerEl = document.getElementById('external-events');
  new Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function(eventEl) {
      return {
        title: eventEl.innerText
      };
    }
  });

})

apiStyle.getStyleList((d)=>{
  styleList.value=d.list
  // console.log("样式",globalData,d)
})

getList()

</script>

<template>
  <div>
    <StipulateTemplate :title="title?title:$t('calendar.subject.title')" :dialog="dialog">
      <!-- <el-button type="primary" :icon="Plus" @click="manageDialogShow=true">主题管理</el-button> -->
      <div id='external-events'>
        <div v-for=" item,index in subjectList" :key="index"  style="display:flex;">
          <div class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'  style="display:flex;margin-right:20px;" :styleClass="item.className"  :class="item.className">
            <div class='fc-event-main' >#{{item.title}}# </div>
          </div>
          <div style="display:flex;align-content: center; align-items: center;">
            <el-icon class="opeation-icon"  @click="updateSubjectOpen(item)"><Edit/></el-icon>
            <el-icon class="opeation-icon" @click="deleteSubjectOne(item)"><Delete/></el-icon>
          </div>
        </div>
        
      </div>
      <div style="margin-bottom:20px">
        <el-button  :icon="Plus" size="small" @click="addSubject">{{$t('calendar.subject.addSubject')}}</el-button>
      </div>
    </StipulateTemplate>

    <!-- 事件主题管理窗口 弃用-->
    <!-- <Edialog 
      v-model:visible="manageDialogShow" 
      width="500px"
      :title="$t('calendar.subject.edialog_title')" 
      >

      <el-button type="primary" @click="editDialogShow=true">{{$t('calendar.subject.edialog_new_button')}}</el-button>
        
        <el-table ref="subjectListTableRef" :data="subjectList" height="600px" style="width: 100%">

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
      
          <el-table-column label="编辑">
            <template #default="scope">
            <el-button type="primary" @click="updateEventStyle(scope.row)" :icon="Edit" />
            <el-button type="danger" @click="deleteOne(scope.row)" :icon="Delete"  />
            </template>
          </el-table-column>

        </el-table>



    </Edialog> -->

    <!-- 编辑 -->
    <Edialog 
      v-model:visible="editDialogShow" 
      width="500px"
      :title="editSubjectInfoEdialog.title" 
      >
        <el-form
            label-width="100px"
            style="max-width: 460px"
            ref="editSubjectFormRef"
            :model="editSubjectInfo"
        >
          <el-form-item :label="$t('calendar.subjectEdit.title')" prop="title">
            <el-input v-model="editSubjectInfo.title" type="text" :placeholder="$t('calendar.subjectEdit.title_placeholder')" />
          </el-form-item>

          <el-row :gutter="10" >
            <!-- <el-col :span="formSpan" >
              <el-form-item :label="$t('calendar.eventEdit.endTime')">
                <el-date-picker
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model="editSubjectInfo.endTime"
                  type="datetime"
                  :placeholder="$t('calendar.eventEdit.endTime_placeholder')"
                />
              </el-form-item>
            </el-col> -->

            <el-col>
              <el-form-item :label="$t('calendar.eventEdit.style')" prop="className">
                <!-- <el-select v-model="editSubjectInfo.className" :placeholder="$t('calendar.eventEdit.style_placeholder')">
                  <el-option :label="item.title" :value="item.className" v-for="(item,index) in styleList" :key="index"/>
                </el-select> -->
                <SelectStyle :data="styleList"  v-model="editSubjectInfo.className" />
              </el-form-item>
            </el-col>
          </el-row>

          
        </el-form>
        <template #footer>
            <el-button type="primary" @click="saveSubject">确定</el-button>
        </template>

    </Edialog>
  </div>
</template>

<style scoped>

#external-events {
  display: flex;
  width: 280px;
  /* padding: 0 20px; */
  display: flex;
  flex-direction:column;
  /* background: pink; */
}

#external-events .fc-event {
  width: 100%;
  height: 20px;
  line-height: 20px;
  display: flex;
  font-size: 14px;
  cursor: move;
  margin: 5px 0;
  padding-left: 5px;
}

.opeation-icon{
  cursor: pointer;
  margin-right:10px;
  color: var(--el-text-color-regular);
  font-weight: 800;
}

.opeation-icon:hover{
  color: var(--el-color-primary);
}

</style>
