<script setup>
import { reactive, ref,unref } from '@vue/reactivity'
import Edialog from "../../components/Edialog.vue";

import apiAdminUsers from "../../api/admin/users";

import { Edit,Delete} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';

import validate from "../../utils/validate";
import request from '../../api/request';

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
    callback("请输入邮箱格式作为账号")
  }else{
    callback()
  }
}

const formRules=reactive({
  username:[
    { required: true,message:"必填项",trigger: 'blur'},
    { validator:vaildateIsEmail,trigger: 'blur'},
    
  ],
  name:[
    { required: true,message:"必填项",trigger: 'blur'},
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
      console.log("提交",userForm.value)
      if(!userForm.value.userId){
        // 创建
        apiAdminUsers.create(userForm.value,(d)=>{
          usersTableRef.resetFields()
          ElMessage.success("创建完成")
          getList()
          editVisible.value=false
        })
      }else{
        // 修改
        apiAdminUsers.update(userForm.value,(d)=>{
          usersTableRef.resetFields()
          ElMessage.success("修改完成")
          getList()
          editVisible.value=false
        })
      }
    }
  })
  
}

const deleteOne=(info)=>{
  ElMessageBox.confirm(
    `请确认是否删除用户：${info.name} [${info.username}]`,
    '警告',
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
  <el-button @click="createUser" type="primary">新建用户</el-button>

  <Edialog v-model:visible="editVisible" title="编辑" :closeOnClickModal="true" bigScreenWidth="600px" @close="usersTableRef?.resetFields?.()">
    <el-form :model="userForm" ref="usersTableRef" label-width="120px" :rules="formRules">
      <el-form-item label="账号" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入邮箱格式" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="userForm.name" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role">
          <el-option label="管理员" :value="1" />
          <el-option label="普通用户" :value="2"  />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="userForm.status">
          <el-option label="启用" :value="1" />
          <el-option label="停用" :value="2" />
          <!-- <el-option label="未激活" :value="3" /> -->
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="submitForm(usersTableRef)">保存</el-button>
    </template>
  </Edialog>



  <el-table ref="usersTableRef" :data="tableData" height="calc(100% - 40px)" style="width: 100%">

    <el-table-column type="selection" width="55" />
    
    <el-table-column prop="userId" label="UID" > </el-table-column>

    <el-table-column prop="name" label="名称"  width="180"/>

    <el-table-column prop="username" label="账号" width="180" > </el-table-column>
    
    <el-table-column label="角色">
      <template #default="scope">
        <el-tag v-if="scope.row.role==1">管理员</el-tag>
        <!-- <el-tag v-else="scope.row.role==2" type="info">普通用户</el-tag> -->
        <el-tag v-else type="success">普通用户</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="状态">
      <template #default="scope">
        <el-tag v-if="scope.row.status==1"  type="success">正常</el-tag>
        <el-tag v-else-if="scope.row.status==2" type="danger">停用</el-tag>
        <el-tag v-else-if="scope.row.status==3" type="info">未激活</el-tag>
        <!-- <el-tag v-else></el-tag> -->
      </template>
    </el-table-column>

    <el-table-column label="编辑">
      <template #default="scope">
       <el-button type="primary" @click="updateUser(scope.row)" :icon="Edit" />
       <el-button type="danger" @click="deleteOne(scope.row)" :icon="Delete"  />
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-pagination background layout="prev, pager, next" :total="1000" /> -->
</div>
</template>
