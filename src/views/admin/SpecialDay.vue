<script setup>
import { reactive, ref } from '@vue/reactivity'
import Edialog from "../../components/Edialog.vue";
import moment from 'moment'

import apiSpecialDay from "../../api/admin/specialDay";

import { Document, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '../../api/request';
import cmn from '../../utils/cmn'

const shwoBorder = ref(false)
const tableData = ref()
const infoDaysTable =ref()
const editVisible = ref(false)

const uploadRef = ref()


const getList = () => {
  apiSpecialDay.getList((d) => {
    tableData.value = d.list
  })
}
const deleteOne = (row) => {
  console.log(row)
  ElMessageBox.confirm(
    '确定删除该方案 ' + row.name,
    '警告',
    {
      type: 'warning',
    }
  ).then(() => {
    apiSpecialDay.deleteOne(row.id, () => {
      ElMessage.success("已删除")
      getList()
    })

  })
}

const edialogDays=(row)=>{
  
  editVisible.value=true

  apiSpecialDay.getInfoDays(row.id,(d)=>{
    infoDaysTable.value=d.list
  })
}

// 上传导入文件
const submitUpload = () => {
  uploadRef.value.submit()
}
// 配置文件上传成功
const jsonConfigUploadSuccess = (response, uploadfile) => {
  if (response.code == 0) {
    ElMessage.success("导入成功")
    getList()
  } else {
    ElMessage.warning("导入失败," + response.msg)
  }
}
getList()
</script>

<template>
  <div style="padding:20px;height:calc(100% - 50px)">
    <!-- <h2>风格管理</h2> -->
    <!-- <el-button @click="createEventStyle">新建</el-button> -->
    <!-- <el-button @click="exportjsonFile">导出</el-button> -->
    <el-upload ref="uploadRef" action="/api/v1/admin/specialDay/specialDayImport" :headers="{token:request.getToken()}"
      :auto-upload="true" :on-success="jsonConfigUploadSuccess" :accept="cmn.uploadAcceptType" :show-file-list="false"
      style="display: inline-flex;margin-left:12px">
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

   


    <el-table ref="styleTableRef" :data="tableData" height="calc(100% - 40px)" style="width: 100%">

      <!-- <el-table-column type="selection" width="55" /> -->

      <el-table-column prop="name" label="特殊日期方案" />
      <el-table-column prop="onlyId" label="标识"  />
      

      <el-table-column prop="updateTime" label="更新日期" width="180">
 

      </el-table-column>
      <el-table-column >
        <template #default="scope">
          <el-button type="primary" @click="edialogDays(scope.row)" :icon="Document" />
          <!-- <el-button type="primary" @click="updateEventStyle(scope.row)" :icon="Edit" /> -->
          <el-button type="danger" @click="deleteOne(scope.row)" :icon="Delete" />
        </template>
      </el-table-column>

    </el-table>

    <Edialog v-model:visible="editVisible" title="详情" :closeOnClickModal="true" bigScreenwidth="600px">
      <el-table ref="styleTableRef" :data="infoDaysTable" height="500px">
        <el-table-column prop="note" label="备注" />
        <el-table-column prop="startTime" label="开始" />
        <el-table-column prop="endTime" label="结束" />
        <el-table-column label="是否为假期" width="180">
          <template #default="scope">
            <span v-if="scope.row.type == 2 ">{{ $t("common.yes") }}</span>
          </template>
        </el-table-column>
        
      </el-table>
    
    </Edialog>

  </div>

</template>

<style scoped>
#external-events {
  display: flex;
  width: 200px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
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

.demo-color-block {
  margin-top: 10px;
}
</style>