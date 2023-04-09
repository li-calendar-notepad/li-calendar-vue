<script setup>
import { reactive, ref,unref } from '@vue/reactivity'
import Edialog from "../../components/Edialog.vue";

import apiAdminUsers from "../../api/admin/users";

import { Edit,Delete,Plus} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';

import validate from "../../utils/validate";
import request from '../../api/request';
import { useI18n } from "vue-i18n";
const $i18n=useI18n();
const userForm = ref({
  name:"",
  userId:0,
  username:"",
  status:1,
  role:2,
})
const tableData=ref()
const editVisible=ref(false)

const usersTableRef=ref()


const vaildateIsEmail=(rule, value, callback)=>{
  if(!validate.isEmail(value)){
    callback( $i18n.t('adminUsers.usernamePlaceholder'))
  }else{
    callback()
  }
}

const formRules=reactive({
  username:[
    { required: true,message:$i18n.t('form.required'),trigger: 'blur'},
    { validator:vaildateIsEmail,trigger: 'blur'},
    
  ],
  name:[
    { required: true,message:$i18n.t('form.required'),trigger: 'blur'},
  ]
})


const getList=()=>{
  apiAdminUsers.getList((d)=>{
    tableData.value=d.list
  })
}

const createUser=()=>{
  editVisible.value=true
}

const updateUser=(info)=>{
  editVisible.value=true
  userForm.value=JSON.parse(JSON.stringify(info))
}


const submitForm=(usersTableRef)=>{
  usersTableRef.validate((valid)=>{
    if(valid){
      // console.log("提交",userForm.value)
      if(!userForm.value.userId){
        // 创建
        apiAdminUsers.create(userForm.value,(d)=>{
          usersTableRef.resetFields()
          ElMessage.success($i18n.t('common.operation')+$i18n.t('common.complete'))
          getList()
          editVisible.value=false
        })
      }else{
        // 修改
        apiAdminUsers.update(userForm.value,(d)=>{
          usersTableRef.resetFields()
          ElMessage.success($i18n.t('common.operation')+$i18n.t('common.complete'))
          getList()
          editVisible.value=false
        })
      }
    }
  })
  
}

const deleteOne=(info)=>{
  ElMessageBox.confirm(
    $i18n.t('adminUsers.delTip')+`:${info.name} [${info.username}]`,
    $i18n.t('common.warning'),
    {
      type: 'warning',
    }
  )
  .then(() => {
    apiAdminUsers.deletes([info.userId],()=>{
      getList()
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
  })
  
  // ElMessageBox.confirm(
  //   '确定删除该风格样式 '+eventStyle.title,
  //   '警告',
  //   {
  //     type: 'warning',
  //   }
  // ).then(() => {
  //   apiStyle.deletes([eventStyle.styleId],()=>{
  //     ElMessage.success("已删除")
  //     getList()
  //   })
    
  // })
}

getList()
</script>

<template>
<div style="padding:20px;height:calc(100% - 50px)">
  <!-- <h2>风格管理</h2> -->
  <el-button @click="createUser" :icon="Plus"  type="primary">{{$t('adminUsers.createUser')}}</el-button>

  <Edialog v-model:visible="editVisible" :title="$t('common.edit')" :closeOnClickModal="true" bigScreenWidth="600px" @close="usersTableRef?.resetFields?.()">
    <el-form :model="userForm" ref="usersTableRef" label-width="auto" :rules="formRules">
      <el-form-item :label="$t('common.username')" prop="username">
        <el-input v-model="userForm.username" :placeholder="$t('adminUsers.usernamePlaceholder')" />
      </el-form-item>
      <el-form-item :label="$t('common.name')" prop="name">
        <el-input v-model="userForm.name" />
      </el-form-item>
      <el-form-item :label="$t('common.role')" prop="role">
        <el-select v-model="userForm.role">
          <el-option :label="$t('adminUsers.adminUser')" :value="1" />
          <el-option :label="$t('adminUsers.user')" :value="2"  />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('common.status')" prop="status">
        <el-select v-model="userForm.status">
          <el-option :label="$t('common.startUse')" :value="1" />
          <el-option :label="$t('common.stopUse')" :value="2" />
          <!-- <el-option label="未激活" :value="3" /> -->
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="submitForm(usersTableRef)">{{$t('common.save')}}</el-button>
    </template>
  </Edialog>



  <el-table ref="usersTableRef" :data="tableData" height="calc(100% - 40px)" style="width: 100%">

    <el-table-column type="selection" width="55" />
    
    <el-table-column prop="userId" label="UID" > </el-table-column>

    <el-table-column prop="name" :label="$t('common.name')"  width="180"/>

    <el-table-column prop="username" :label="$t('common.username')" width="180" > </el-table-column>
    
    <el-table-column :label="$t('common.role')">
      <template #default="scope">
        <el-tag v-if="scope.row.role==1">{{$t('adminUsers.adminUser')}}</el-tag>
        <!-- <el-tag v-else="scope.row.role==2" type="info">普通用户</el-tag> -->
        <el-tag v-else type="success">$t('adminUsers.user')</el-tag>
      </template>
    </el-table-column>

    <el-table-column :label="$t('common.status')">
      <template #default="scope">
        <el-tag v-if="scope.row.status==1"  type="success">{{$t('common.normal')}}</el-tag>
        <el-tag v-else-if="scope.row.status==2" type="danger">{{$t('common.stopUse')}}</el-tag>
        <el-tag v-else-if="scope.row.status==3" type="info">{{$t('common.notActive')}}</el-tag>
        <!-- <el-tag v-else></el-tag> -->
      </template>
    </el-table-column>

    <el-table-column>
      <template #default="scope">
       <el-button type="primary" @click="updateUser(scope.row)" :icon="Edit" />
       <el-button type="danger" @click="deleteOne(scope.row)" :icon="Delete"  />
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-pagination background layout="prev, pager, next" :total="1000" /> -->
</div>
</template>
